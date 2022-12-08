let folderNames = [];
function createFolder(folderName) {
  let len = 0;
  cy.get('div [class="ellipsis"]')
    .each(($element, index, $list) => {
      if (len < $list.length) {
        cy.log(len, "...", $element.text().trim());
        folderNames[len] = $element.text().trim();
        len++;
      }
    })
    .then(() => {
      validateFolderName(folderName);
    });
}

function validateFolderName(folderName) {
  if (folderNames.includes(folderName)) {
    folderName = folderName + "-c";
    validateFolderName(folderName);
  } else {
    createNewFolder(folderName);
  }
}

function createNewFolder(folderName) {
  cy.contains("i", "create_new_folder").click(); //click to Create New Folder Button
  cy.get(`input[aria-label='Folder Name']`).type(folderName);
  cy.get(".q-btn__wrapper > span > span ").contains("Ok").click();
  cy.log("folder created successfully ...");
}

export { createFolder };
