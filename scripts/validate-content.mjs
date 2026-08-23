import { access, readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const contentPath = fileURLToPath(new URL("../content/site.json", import.meta.url));
const publicPath = fileURLToPath(new URL("../public/", import.meta.url));
const errors = [];
const referencedAssets = new Set();

function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function validateObject(value, path, expectedKeys) {
  if (!isObject(value)) {
    errors.push(`${path} must be an object.`);
    return {};
  }

  const actualKeys = Object.keys(value);
  for (const key of expectedKeys) {
    if (!Object.hasOwn(value, key)) {
      errors.push(`${path}.${key} is missing.`);
    }
  }

  for (const key of actualKeys) {
    if (!expectedKeys.includes(key)) {
      errors.push(`${path}.${key} is not an approved content field.`);
    }
  }

  return value;
}

function validateText(value, path, { min = 1, max = 500, optional = false } = {}) {
  if (typeof value !== "string") {
    errors.push(`${path} must be plain text.`);
    return "";
  }

  const length = value.trim().length;
  if (optional && length === 0) return value;
  if (length < min) errors.push(`${path} must contain at least ${min} character${min === 1 ? "" : "s"}.`);
  if (length > max) errors.push(`${path} must contain no more than ${max} characters.`);
  return value;
}

function validateHeading(value, path, beforeMax = 180) {
  const heading = validateObject(value, path, ["beforeEmphasis", "emphasis", "afterEmphasis"]);
  validateText(heading.beforeEmphasis, `${path}.beforeEmphasis`, { max: beforeMax });
  validateText(heading.emphasis, `${path}.emphasis`, { max: 100 });
  validateText(heading.afterEmphasis, `${path}.afterEmphasis`, { max: 100, optional: true });
}

function validatePublicUrl(value, path) {
  validateText(value, path, { max: 500, optional: true });
  if (typeof value !== "string" || value.trim() === "") return;

  try {
    const url = new URL(value);
    if (!["http:", "https:"].includes(url.protocol)) {
      errors.push(`${path} must begin with http:// or https://.`);
    }
    if (url.username || url.password) {
      errors.push(`${path} must not contain embedded credentials.`);
    }
  } catch {
    errors.push(`${path} must be a complete public URL.`);
  }
}

function validateImagePath(value, path) {
  validateText(value, path, { max: 300, optional: true });
  if (typeof value !== "string" || value === "") return;
  if (!/^\/uploads\/images\/[a-zA-Z0-9][a-zA-Z0-9._-]*\.(?:jpe?g|png|webp)$/i.test(value)) {
    errors.push(`${path} must reference a JPG, PNG, or WebP file in /uploads/images/.`);
  } else {
    referencedAssets.add(value);
  }
}

function validateImage(value, path, imageKey = "image", altKey = "alt") {
  const image = validateObject(value, path, [imageKey, altKey]);
  const imagePath = validateText(image[imageKey], `${path}.${imageKey}`, { max: 300, optional: true });
  const alt = validateText(image[altKey], `${path}.${altKey}`, { max: 180, optional: true });
  validateImagePath(imagePath, `${path}.${imageKey}`);
  if (typeof imagePath === "string" && imagePath !== "" && typeof alt === "string" && alt.trim() === "") {
    errors.push(`${path}.${altKey} is required when an image is selected.`);
  }
}

function validateProject(value, path) {
  const project = validateObject(value, path, [
    "category",
    "title",
    "summary",
    "impact",
    "image",
    "imageAlt",
    "caseStudyUrl",
  ]);
  validateText(project.category, `${path}.category`, { max: 100 });
  validateText(project.title, `${path}.title`, { max: 180 });
  validateText(project.summary, `${path}.summary`, { min: 10, max: 600 });
  validateText(project.impact, `${path}.impact`, { max: 280 });
  const imagePath = validateText(project.image, `${path}.image`, { max: 300, optional: true });
  const imageAlt = validateText(project.imageAlt, `${path}.imageAlt`, { max: 180, optional: true });
  validateImagePath(imagePath, `${path}.image`);
  if (typeof imagePath === "string" && imagePath !== "" && typeof imageAlt === "string" && imageAlt.trim() === "") {
    errors.push(`${path}.imageAlt is required when an image is selected.`);
  }
  validatePublicUrl(project.caseStudyUrl, `${path}.caseStudyUrl`);
}

function validateCapability(value, path) {
  const capability = validateObject(value, path, ["title", "description"]);
  validateText(capability.title, `${path}.title`, { max: 80 });
  validateText(capability.description, `${path}.description`, { min: 10, max: 320 });
}

let content;
try {
  content = JSON.parse(await readFile(contentPath, "utf8"));
} catch (error) {
  console.error(`Content validation failed: ${error.message}`);
  process.exit(1);
}

const root = validateObject(content, "site", [
  "profile",
  "hero",
  "capabilityStrip",
  "work",
  "capabilities",
  "about",
  "testimonial",
  "resume",
  "contact",
]);

const profile = validateObject(root.profile, "site.profile", ["professionalTitle", "siteDescription"]);
validateText(profile.professionalTitle, "site.profile.professionalTitle", { max: 100 });
validateText(profile.siteDescription, "site.profile.siteDescription", { min: 20, max: 240 });

const hero = validateObject(root.hero, "site.hero", [
  "eyebrow",
  "heading",
  "introduction",
  "primaryActionLabel",
  "secondaryActionLabel",
  "visual",
]);
validateText(hero.eyebrow, "site.hero.eyebrow", { max: 100 });
validateHeading(hero.heading, "site.hero.heading");
validateText(hero.introduction, "site.hero.introduction", { min: 20, max: 600 });
validateText(hero.primaryActionLabel, "site.hero.primaryActionLabel", { max: 80 });
validateText(hero.secondaryActionLabel, "site.hero.secondaryActionLabel", { max: 80 });
const heroVisual = validateObject(hero.visual, "site.hero.visual", ["image", "alt", "placeholderMessage"]);
const heroImagePath = validateText(heroVisual.image, "site.hero.visual.image", { max: 300, optional: true });
const heroImageAlt = validateText(heroVisual.alt, "site.hero.visual.alt", { max: 180, optional: true });
validateImagePath(heroImagePath, "site.hero.visual.image");
if (typeof heroImagePath === "string" && heroImagePath !== "" && typeof heroImageAlt === "string" && heroImageAlt.trim() === "") {
  errors.push("site.hero.visual.alt is required when an image is selected.");
}
validateText(heroVisual.placeholderMessage, "site.hero.visual.placeholderMessage", { min: 5, max: 280 });

const capabilityStrip = validateObject(root.capabilityStrip, "site.capabilityStrip", ["item1", "item2", "item3", "item4"]);
for (const key of ["item1", "item2", "item3", "item4"]) {
  validateText(capabilityStrip[key], `site.capabilityStrip.${key}`, { max: 60 });
}

const work = validateObject(root.work, "site.work", [
  "eyebrow",
  "heading",
  "introduction",
  "project1",
  "project2",
  "project3",
]);
validateText(work.eyebrow, "site.work.eyebrow", { max: 80 });
validateHeading(work.heading, "site.work.heading");
validateText(work.introduction, "site.work.introduction", { min: 10, max: 400 });
for (const key of ["project1", "project2", "project3"]) {
  validateProject(work[key], `site.work.${key}`);
}

const capabilities = validateObject(root.capabilities, "site.capabilities", [
  "eyebrow",
  "heading",
  "introduction",
  "item1",
  "item2",
  "item3",
  "item4",
]);
validateText(capabilities.eyebrow, "site.capabilities.eyebrow", { max: 80 });
validateHeading(capabilities.heading, "site.capabilities.heading");
validateText(capabilities.introduction, "site.capabilities.introduction", { min: 10, max: 400 });
for (const key of ["item1", "item2", "item3", "item4"]) {
  validateCapability(capabilities[key], `site.capabilities.${key}`);
}

const about = validateObject(root.about, "site.about", [
  "eyebrow",
  "heading",
  "paragraph1",
  "paragraph2",
  "portrait",
  "resumeActionLabel",
]);
validateText(about.eyebrow, "site.about.eyebrow", { max: 80 });
validateHeading(about.heading, "site.about.heading");
validateText(about.paragraph1, "site.about.paragraph1", { min: 10, max: 900 });
validateText(about.paragraph2, "site.about.paragraph2", { min: 10, max: 900 });
validateImage(about.portrait, "site.about.portrait");
validateText(about.resumeActionLabel, "site.about.resumeActionLabel", { max: 100 });

const testimonial = validateObject(root.testimonial, "site.testimonial", [
  "eyebrow",
  "quote",
  "personName",
  "personRole",
  "personCompany",
]);
validateText(testimonial.eyebrow, "site.testimonial.eyebrow", { max: 80 });
validateText(testimonial.quote, "site.testimonial.quote", { min: 10, max: 700 });
validateText(testimonial.personName, "site.testimonial.personName", { max: 120 });
validateText(testimonial.personRole, "site.testimonial.personRole", { max: 120 });
validateText(testimonial.personCompany, "site.testimonial.personCompany", { max: 120 });

const resume = validateObject(root.resume, "site.resume", ["eyebrow", "heading", "introduction", "actionLabel", "file"]);
validateText(resume.eyebrow, "site.resume.eyebrow", { max: 80 });
validateText(resume.heading, "site.resume.heading", { max: 140 });
validateText(resume.introduction, "site.resume.introduction", { min: 10, max: 400 });
validateText(resume.actionLabel, "site.resume.actionLabel", { max: 80 });
const resumePath = validateText(resume.file, "site.resume.file", { max: 300, optional: true });
if (typeof resumePath === "string" && resumePath !== "" && !/^\/uploads\/documents\/[a-zA-Z0-9][a-zA-Z0-9._-]*\.pdf$/i.test(resumePath)) {
  errors.push("site.resume.file must reference a PDF in /uploads/documents/.");
} else if (typeof resumePath === "string" && resumePath !== "") {
  referencedAssets.add(resumePath);
}

const contact = validateObject(root.contact, "site.contact", [
  "eyebrow",
  "heading",
  "introduction",
  "email",
  "linkedInUrl",
]);
validateText(contact.eyebrow, "site.contact.eyebrow", { max: 80 });
validateHeading(contact.heading, "site.contact.heading");
validateText(contact.introduction, "site.contact.introduction", { min: 10, max: 400 });
const email = validateText(contact.email, "site.contact.email", { max: 254, optional: true });
if (typeof email === "string" && email !== "" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
  errors.push("site.contact.email must be a valid email address or left empty.");
}
validatePublicUrl(contact.linkedInUrl, "site.contact.linkedInUrl");

for (const assetPath of referencedAssets) {
  try {
    await access(resolve(publicPath, `.${assetPath}`));
  } catch {
    errors.push(`${assetPath} is referenced by the content file but is missing from public uploads.`);
  }
}

if (errors.length > 0) {
  console.error("Content validation failed:\n");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Content validation passed.");
