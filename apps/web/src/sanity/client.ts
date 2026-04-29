import { createClient } from "next-sanity";


console.log('process.env', process.env);
export const client = createClient({
  projectId:'5vyl1ny8',
  dataset: 'production',
  apiVersion: "2025-07-09",
  useCdn: false,
});