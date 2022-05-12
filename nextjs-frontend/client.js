import sanityClient from "@sanity/client";

export default sanityClient({
  projectId: "kjrje0vw", // you can find this in sanity.json
  dataset: "production", // or the name you chose in step 1
  useCdn: true, // `false` if you want to ensure fresh data
  apiVersion: "2022-02-01" // or leave blank for latest
});
