//const fs = require("fs"); //using this module by requiring "fs"

//fs.copyFileSync("file1.txt", "file2.txt"); //Allow you to copy any file you wish

const superheroes = require("superheroes");
const supervillains = require("supervillains");

var mySuperHeroName = superheroes.random();
var mySuperVillainName = supervillains.random();

console.log(mySuperHeroName, mySuperVillainName);