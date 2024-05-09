import { sanityClient } from "sanity:client";
import groq from "groq";

export async function getArt() {
  return await sanityClient.fetch(
    groq`*[_type == "art"] | order(orderRank)`,
  );
}

export async function getAbout() {
  return await sanityClient.fetch(
    groq`*[_type == "about"]`,
  );
}