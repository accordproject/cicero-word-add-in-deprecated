# Accord Project Smart Clause Microsoft Word add-in

Use the Accord Project Microsoft Word add-in to manage the Smart Clauses in your legal documents.

## Table of Contents
* [Change History](#change-history)
* [Prerequisites](#prerequisites)
* [Installation](#installation)
* [For Developers](#for-developers)

## Change History

April 25, 2018:

* Initial version: basic React based UI framework is in place. Binds text in the document to Smart Clauses. Introspects clauses to create templates (in progress).

## Prerequisites

* Microsoft Word 2016

## Installation

> Note: installation from the Microsoft Marketplace will be possible once the add-in is published to the web. For now you need to manually install the add-in as described below.

1. Clone this repo using Git.
2. Open a Node.js command prompt in the root folder of the project.
2. Run `npm install` to install all dependencies.
3. Run `npm start` to start the project. A browser window opens showing a partial UI.
4. To see the full UI, open Word and sideload the manifest.

```
cp cicero-word-add-in.xml /Users/<NAME>/Library/Containers/com.microsoft.Word/Data/Documents/wef/
```

If the `wef` folder does not exist you need to create it.

To activate the task pane:

1. Launch Word
2. Press the "Insert" tab
3. Press the down arrow to the right of the "My Add-ins" button
4. Select the "Accord Project" add-in
5. Press the button to open the task pane and activate the add-in

## For Developers

 For more information, see [Sideload Office Add-ins for testing](https://dev.office.com/docs/add-ins/testing/create-a-network-shared-folder-catalog-for-task-pane-and-content-add-ins).

To understand how the project files are set up, and to learn how to create your own project using these components, see [Use Office UI Fabric React in Office Add-ins](https://dev.office.com/docs/add-ins/design/using-office-ui-fabric-react).

* [Design guidelines for Office add-ins](https://dev.office.com/docs/add-ins/design/add-in-design)
* [Office add-in documentation](https://msdn.microsoft.com/en-us/library/office/jj220060.aspx)
* [Office Dev Center](http://dev.office.com/)
* More Office Add-in samples at [OfficeDev on Github](https://github.com/officedev)


* JavaScript APIs used in this project to interact with the objects and metadata in a Word document

You can use two sets of JavaScript APIs to interact with the objects and metadata in a Word document.
The first one is [Common API](https://docs.microsoft.com/en-us/javascript/api/office?view=word-js-preview) and
the second one is the [Word JavaScript API](https://docs.microsoft.com/en-us/javascript/api/word?view=word-js-preview).

For this project we are using [Common Api](https://docs.microsoft.com/en-us/javascript/api/office?view=word-js-preview). It is a strongly-typed object model that is used to create Word add-ins that target Word 2016 or above.
