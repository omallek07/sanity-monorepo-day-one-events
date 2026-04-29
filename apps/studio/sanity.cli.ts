import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
     projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
    dataset: process.env.SANITY_STUDIO_DATASET!,
  },
  studioHost: process.env.SANITY_STUDIO_HOSTNAME!,
  deployment: {
    appId: 'ubq0v1226lkxafcdg6hja92w',
    //https://day-one-content-operations-ko.sanity.studio/
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  }
})
