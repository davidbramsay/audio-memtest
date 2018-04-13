var fs = require('fs');

//call with node generate_hit_ids.js

//This will generate a two text files - hit_values and hit_values_ref.
//Both will start identically, with NUM_HITS unique identifiers.
//Each call to GET /api/memtest-id-identifier will return one of the IDs from
//hit_values and delete it from the file.

//if you've depleted all hits, it will return 'All hits have been
//accounted for.  If you believe this is an error, contact davidr@mit.edu'

const NUM_HITS = 5000;


function makeid(len=32) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < len; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

gen_ids = "";

for (i=0; i<NUM_HITS;i++){
    gen_ids += makeid() + '\n';
}

//let ref_id = makeid(6);
fs.writeFile("./hit_values.txt", gen_ids, function(){return;})
fs.writeFile("./hit_values_ref.txt", gen_ids, function(){return;})
