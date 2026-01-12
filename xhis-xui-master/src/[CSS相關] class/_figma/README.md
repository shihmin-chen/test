How to extract figma data to variable
===

1. Download and build [figma-plugin-extractor](https://github.com/hikariNTU/figma-plugin-extractor)

2. Go to the design system page of figma on the website \
If Main menu > Plugins shows "Unavailable in view-only",
you should **duplicate the file to your drafts**

3. Go to the draft file on the website \
Main menu > Plugins > Manage Plugins > **download the figma desktop app** to manage plugins in develepment

4. Open figma desktop app and setup plugins \
Main menu > Plugins > Manage Plugins > Add > **Import plugin from manifest** \
Select `figma-plugin-extractor/packages/plugin/manifest.json`

5. At figma desktop app, Main menu > Quick actions > Search and run **Extractor** \
Copy the code from "Get Color CSS" action and then paste to `base-light.css`
    > If extract failed, please update version of `tsm` to latest

6. Format the css file \
Install [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) \
Execute **Format Document** at `base-light.css`

7. Update the color mapping `packages/xui/src/shared/color/_figma/color.data.ts`
to display new colors in demo page
