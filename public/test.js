/*
 *  Я пробовал отключать главное событие из index.html и заупускать свое событие после создания
 *  начального рабочего пространства в before() и делал я это и с помощью флагов и простого
 *  переключения событий.
 *  НО события выполняются всегда одним обработчиком потому что существует очередь событий и
 *  когда оно полностьюзаполняется то только тогда вызывается обработчик.
 */


let switchEvents = true;

function myUpdateFunction_1(event) {
	if (switchEvents) {
		myUpdateFunction(event);
	}
}
/*function myUpdateFunction_2(event) {
	if (!switchEvents) {
console.log('myUpdateFunction_2');
console.log(event);
	  	if (event.type == Blockly.Events.BLOCK_CHANGE
	  		&& workspace.getBlockById(event.blockId) != null
			&& workspace.getBlockById(event.blockId).type === "attr_block_id") {
console.log(20);
				console.log(JSON.parse(JSON.stringify(idsBlock)));
				console.log(event);
		  		let next = workspace.getBlockById(event.blockId);
		  		console.log(next);
		  		let handler = new PutBlockId(next, event);
		  		var recursion = new Skeleton(handler);
				recursion.recSkeleton();
		  		console.log(JSON.parse(JSON.stringify(idsBlock)));
console.log(21);
		  		alert(Object.values(idsBlock)[1][0]);
console.log(22);
	  			assert.equal(Object.values(idsBlock)[1][0], 'bb');
console.log(23);
	  			//assert.equal(Object.values(idsBlock)[1][1], 'a');
		  		//alert(Object.values(idsBlock)[1][1]);
		  		switchEvents = !switchEvents;
console.log(24);
	  	}
	  }
  }*/

describe("PutBlockId", function() {
    
    let blockM_2;

  before(function() {
  	workspace.removeChangeListener(myUpdateFunction);
	workspace.addChangeListener(myUpdateFunction_1);
	//workspace.addChangeListener(myUpdateFunction_2);
  	//workspace.addChangeListener(myUpdateFunction);
  	let model = workspace.newBlock("model");
  	model.moveBy(50, 50);
  	model.initSvg();
  	model.render(false);
console.log(1);
  	let set1 = workspace.newBlock("set_model_first");
  	set1.initSvg();
  	set1.render(false);
  	model.getInput('DO').connection.connect(set1.previousConnection);
console.log(2);
  	let set1_2 = workspace.newBlock("set_model_first");
  	set1_2.initSvg();
  	set1_2.render(false);
  	set1.nextConnection.connect(set1_2.previousConnection);
console.log(3);
  	let set2 = workspace.newBlock("set_model_second");
  	set2.initSvg();
  	set2.render(false);
  	set1.getInput('DO').connection.connect(set2.previousConnection);
console.log(4);
  	let blockM = workspace.newBlock("block_model");
  	blockM.initSvg();
  	blockM.render(false);
  	set2.nextConnection.connect(blockM.previousConnection);
console.log(5);
  	blockM_2 = workspace.newBlock("block_model");
  	blockM_2.initSvg();
  	blockM_2.render(false);
  	blockM.nextConnection.connect(blockM_2.previousConnection);

console.log(6);

  	let location = workspace.newBlock("location");
  	location.initSvg();
  	location.render(false);
  	model.nextConnection.connect(location.previousConnection);
console.log(7);
  	let setL = workspace.newBlock("set_location");
  	setL.initSvg();
  	setL.render(false);
  	location.getInput('DO').connection.connect(setL.previousConnection);
console.log(8);
  	let blockL = workspace.newBlock("block_location");
  	blockL.initSvg();
  	blockL.render(false);
  	setL.getInput('DO').connection.connect(blockL.previousConnection);

console.log(9);

  	let attrSetId1 = workspace.newBlock("attr_set_id");
  	attrSetId1.initSvg();
  	attrSetId1.render(false);
  	set1.getInput('ATTRS').connection.connect(attrSetId1.outputConnection);
  	attrSetId1.setFieldValue('a', 'ID');
console.log(10);
  	let attrSetId1_2 = workspace.newBlock("attr_set_id");
  	attrSetId1_2.initSvg();
  	attrSetId1_2.render(false);
  	set1_2.getInput('ATTRS').connection.connect(attrSetId1_2.outputConnection);
  	attrSetId1_2.setFieldValue('b', 'ID');
console.log(11);
  	let attrBlockId = workspace.newBlock("attr_block_id");
  	attrBlockId.initSvg();
  	attrBlockId.render(false);
  	blockM.getInput('ATTRS').connection.connect(attrBlockId.outputConnection);
  	attrBlockId.setFieldValue('aa', 'ID');
  	//Blockly.Events.fire(new (Blockly.Events.get(Blockly.Events.BLOCK_CHANGE))(
  	//	attrBlockId, 'inline', 'ID', '', 'aa'));
  	/*let attrBlockId_2 = workspace.newBlock("attr_block_id");
  	attrBlockId_2.initSvg();
  	attrBlockId_2.render(false);
  	blockM_2.getInput('ATTRS').connection.connect(attrBlockId_2.outputConnection);
  	attrBlockId_2.setFieldValue('bb', 'ID');*/
console.log(12);
  	let attrSetIdL = workspace.newBlock("attr_set_id");
  	attrSetIdL.initSvg();
  	attrSetIdL.render(false);
  	setL.getInput('ATTRS').connection.connect(attrSetIdL.outputConnection);
console.log(13);
  	let attrBlockIdL = workspace.newBlock("attr_block_id");
  	attrBlockIdL.initSvg();
  	attrBlockIdL.render(false);
  	blockL.getInput('ATTRS').connection.connect(attrBlockIdL.outputConnection);
console.log(14);
  	console.log(JSON.parse(JSON.stringify(idsBlock)));
  });






	describe("whole class", function() {
	  it("id of block in idsBlock", function() {
console.log(15);

		//let idsBlockTemp = JSON.parse(JSON.stringify(idsBlock));
		//idsBlockTemp.push({"1":["2","3"]});
		//console.log(JSON.parse(JSON.stringify(idsBlockTemp)));
		console.log(JSON.parse(JSON.stringify(idsBlock)));
console.log(16);
		module.contents.Blockly.Events.utils_fireNow();
		switchEvents = !switchEvents;
		console.log(switchEvents);
	  	//idsBlock = idsBlockTemp;
console.log(17);
	  	let attrBlockId_2 = workspace.newBlock("attr_block_id");
	  	attrBlockId_2.initSvg();
	  	attrBlockId_2.render(false);
	  	blockM_2.getInput('ATTRS').connection.connect(attrBlockId_2.outputConnection);
	  	attrBlockId_2.setFieldValue('bb', 'ID');
	  	//Blockly.Events.fire(new (Blockly.Events.get(Blockly.Events.BLOCK_CHANGE))(
  		//	attrBlockId_2, 'inline', 'ID', '', 'bb'));

console.log(20);
console.log(JSON.parse(JSON.stringify(idsBlock)));
console.log(event);
  		let next = workspace.getBlockById(event.blockId);
console.log(next);
  		let handler = new PutBlockId(next, event);
  		var recursion = new Skeleton(handler);
		recursion.recSkeleton();
console.log(JSON.parse(JSON.stringify(idsBlock)));
console.log(21);
  		alert(Object.values(idsBlock)[1][0]);
console.log(22);
			assert.equal(Object.values(idsBlock)[1][0], 'bb');
console.log(23);

console.log(18);
		console.log(JSON.parse(JSON.stringify(idsBlock)));
	  	/*assert.equal(blockM_2.type, 'block_mode', 'ERRRROOOORRR');
	  	alert(blockM_2.type);
	  	assert.equal(blockM_2.type, 'block_model', 'ERRRROOOORRR2');
	  	alert(blockM_2.type);
	  	done();*/
	  });
	});

});