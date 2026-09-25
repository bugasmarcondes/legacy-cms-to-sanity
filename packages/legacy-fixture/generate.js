#!/usr/bin/env node
// Generates a legacy CMS export fixture: messy HTML "articles" as a JSON array.
// Usage: node generate.js [count]

const fs = require("node:fs");
const path = require("node:path");

const COUNT = Number(process.argv[2]) || 300;

const AUTHORS = ["jane.doe", "john.smith", "amara.okafor", "li.wei", "carlos.reyes"];
const TAGS = ["news", "opinion", "tech", "sports", "culture", "politics", "health", "business"];

function pick(arr, seed) {
  return arr[seed % arr.length];
}

function paragraph(i) {
  return `<p>This is paragraph ${i} of the article body, discussing the topic in moderate detail.</p>`;
}

function brokenInternalLink(i) {
  return `<p>See also our <a href="/articles/legacy-${i * 37 + 9999}">related coverage</a>.</p>`;
}

function nestedTable() {
  return `<table><thead><tr><th>Year</th><th>Value</th></tr></thead><tbody><tr><td>2019</td><td><table><tr><td>nested</td></tr></table></td></tr></tbody></table>`;
}

function videoEmbed() {
  return `<iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" width="560" height="315"></iframe>`;
}

function brokenImage(broken) {
  return broken
    ? `<img src="" alt="missing source" />`
    : `<img src="https://legacy-cms.example.com/uploads/photo.jpg" alt="A photo" />`;
}

function buildArticle(i) {
  const id = `legacy-${i}`;
  const bodyParts = [paragraph(i)];

  // Distribute hard cases across the set so each appears multiple times,
  // not just once, without every article carrying every case.
  const hasBrokenLink = i % 7 === 0;
  const hasTable = i % 11 === 0;
  const hasEmbed = i % 13 === 0;
  const hasBrokenImage = i % 9 === 0;
  const hasEmptyTitle = i % 23 === 0;
  const hasEmptyBody = i % 29 === 0;
  const hasMissingAuthor = i % 31 === 0;
  const hasMissingDate = i % 37 === 0;

  if (hasBrokenLink) bodyParts.push(brokenInternalLink(i));
  if (hasTable) bodyParts.push(nestedTable());
  if (hasEmbed) bodyParts.push(videoEmbed());
  bodyParts.push(brokenImage(hasBrokenImage));

  const article = {
    id,
    title: hasEmptyTitle ? "" : `Legacy Article ${i}`,
    bodyHtml: hasEmptyBody ? "" : bodyParts.join("\n"),
    author: hasMissingAuthor ? null : pick(AUTHORS, i),
    tags: [pick(TAGS, i), pick(TAGS, i + 3)],
    publishedAt: hasMissingDate
      ? null
      : new Date(2015, i % 12, (i % 28) + 1).toISOString(),
  };

  return article;
}

const articles = Array.from({ length: COUNT }, (_, idx) => buildArticle(idx + 1));

const outPath = path.join(__dirname, "fixture.json");
fs.writeFileSync(outPath, JSON.stringify(articles, null, 2));

console.log(`Wrote ${articles.length} articles to ${outPath}`);
