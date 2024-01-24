```
<%*
const dv = app.plugins.plugins["dataview"].api;
const openPublishPanel = app.commands.commands["publish:view-changes"].callback;

const fileAndQuery = new Map([
  [
	"Bakugan",
	'TABLE base-power + " G" AS "Base Power Level", price + " HSP" AS Price FROM "Bakugan" WHERE file.name != "Bakugan" SORT file.name asc'
  ],
  [
    "Special Cards",
    'TABLE bakugan AS Bakugan, price + " HSP" AS Price FROM "Ability Cards/Special Cards" SORT file.name asc'
  ],
  [
	"Command Cards",
	'TABLE price + " HSP" AS Price FROM "Gate Cards/Command Cards" SORT file.name asc'
  ]
]);

await fileAndQuery.forEach(async (query, filename) => {
  if (!tp.file.find_tfile(filename)) {
    await tp.file.create_new("", filename);
    new Notice(`Created ${filename}.`);
  }
  const tFile = tp.file.find_tfile(filename);
  const queryOutput = await dv.queryMarkdown(query);
  const fileContent = `${queryOutput.value}`;
  try {
    await app.vault.modify(tFile, fileContent);
    new Notice(`Updated ${tFile.basename}.`);
  } catch (error) {
    new Notice("⚠️ ERROR updating! Check console. Skipped file: " + filename , 0);
  }
});
openPublishPanel();
%>
```

```

```

