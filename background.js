// Copyright (c) 2010 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// A generic onclick callback function.
function genericOnClick(info, tab) {
  console.log("item " + info.menuItemId + " was clicked");
  console.log("info: " + JSON.stringify(info));
  console.log("tab: " + JSON.stringify(tab));
}

const title = "ta mig till katt";
const context = "editable";

function sendSearch(selectedText) {
  const catSearch = "https://www.youtube.com/results?search_query=cat+animal+" + selectedText;
  chrome.tabs.create({ url: catSearch });
}

chrome.contextMenus.create({
  title: title,
  contexts: ['selection'],
  onclick: function(info, tab) {
    console.log(`background.js: selected text: ${info.selectionText}`);
    const selectedWords = info.selectionText.split(' ');
    console.log(`background.js: splitted selected text: ${selectedWords[1]}`)
    const randomIndex = Math.floor(Math.random()*selectedWords.length);
    sendSearch(selectedWords[randomIndex]);
  }
});

/*
// Create one test item for each context type.
var contexts = ["page","selection","link","editable","image","video",
                "audio"];
for (var i = 0; i < contexts.length; i++) {
  var context = contexts[i];
  var title = "Testar katter";
  var id = chrome.contextMenus.create({"title": title, "contexts":[context],
                                       "onclick": genericOnClick});
  console.log("'" + context + "' item:" + id);
}
*/
