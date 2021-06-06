# Development notes

## TODO

- [ ] make a system


## Generating Compendium packs

1. In your **Items** tab, delete the "Trail of Cthulhu Abilies" folder
2. In the **Compendium Packs** tab, make sure the edit lock is toggled off for the pack (right click and `Toggle edit lock` if you see a padlock.) 
3. Open the browser console (F12) and type `generateTrailAbilitiesData()`
4. Check the compenium packs if you like
5. Copy the `packs/*.db` files back from `dist/` into `src/`


## Release process

We have "release" branch. Its job is to hold a manifest version that points to the right release download.

To perform a release from `master`: 

1. Update the version in `package.json` and `system.json`.
2. Update the `CHANGELOG`.
3. Run `npm run package`.
4. Add the downloadable package .zip to an existing tag, e.g. https://gitlab.com/n3dst4/gumshoe-fvtt/-/releases/v2.0.0
5. Get the download URL for the asset.
6. Paste it into the `download` field of `system.json`.
7. Commit and push.
8. On GitLab, create a tag matching the new version.
9. FF the `release` branch to to `master`.

Now, anyone who installs or upgrades, will see the new manifest, and the new download.

Why do we have a separate `release` branch? To keep control. The manifest on `master` can be unstable, broken, experimental, whatever and we know that users will be safely looking at the `release` version.
