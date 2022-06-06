bmlGenerator['model'] = function(block) {
  const statement_members =
      bmlGenerator.statementToCode(block, 'DO');
  const code = '<model>\n' + statement_members + '\n</model>' + bmlGenerator.blockToCode(block.getNextBlock(), true);
  return code;
}

bmlGenerator['location'] = function(block) {
  var statement_members =
      bmlGenerator.statementToCode(block, 'DO');
  const base = block.getFieldValue('BASE') === '' ? '' : ' base=\"' + block.getFieldValue('BASE') + '\"';
  const attrs = bmlGenerator.valueToCode(block, 'ATTRS', bmlGenerator.PRECEDENCE);
  const code = '<location' + base + attrs + '>\n' + statement_members + '\n</location>\n' + bmlGenerator.blockToCode(block.getNextBlock(), true);
  return code;
}

bmlGenerator['set_model_first'] = function(block) {
  var statement_members =
      bmlGenerator.statementToCode(block, 'DO');
  const name = block.getFieldValue('NAME') === '' ? '' : ' name=\"' + block.getFieldValue('NAME') + '\"';
  const attrs = bmlGenerator.valueToCode(block, 'ATTRS', bmlGenerator.PRECEDENCE);
  const code = '<set' + name + attrs + '>\n' + statement_members + '\n</set>\n' + bmlGenerator.blockToCode(block.getNextBlock(), true);
  return code;
}

bmlGenerator['set_model_second'] = function(block) {
  const name = block.getFieldValue('NAME') === '' ? '' : ' name=\"' + block.getFieldValue('NAME') + '\"';
  const attrs = bmlGenerator.valueToCode(block, 'ATTRS', bmlGenerator.PRECEDENCE);
  const code = '<set' + name + attrs + '/>' + bmlGenerator.blockToCode(block.getNextBlock(), true);
  return code;
}

bmlGenerator['set_location'] = function(block) {
  var statement_members =
      bmlGenerator.statementToCode(block, 'DO');
  const name = block.getFieldValue('NAME') === '' ? '' : ' name=\"' + block.getFieldValue('NAME') + '\"';
  const attrs = bmlGenerator.valueToCode(block, 'ATTRS', bmlGenerator.PRECEDENCE);
  const code = '<set' + name + attrs + '>\n' + statement_members + '\n</set>\n' + bmlGenerator.blockToCode(block.getNextBlock(), true);
  return code;
}

bmlGenerator['block_model'] = function(block) {
  const name = block.getFieldValue('NAME') === '' ? '' : ' name=\"' + block.getFieldValue('NAME') + '\"';
  const attrs = bmlGenerator.valueToCode(block, 'ATTRS', bmlGenerator.PRECEDENCE);
  const code = '<block' + name + attrs + '/>' + bmlGenerator.blockToCode(block.getNextBlock(), true);
  return code;
}

bmlGenerator['block_location'] = function(block) {
  const name = block.getFieldValue('NAME') === '' ? '' : ' name=\"' + block.getFieldValue('NAME') + '\"';
  const attrs = bmlGenerator.valueToCode(block, 'ATTRS', bmlGenerator.PRECEDENCE);
  const code = '<block' + name + attrs + '/>' + bmlGenerator.blockToCode(block.getNextBlock(), true);
  return code;
}

attr_set.forEach(elem => {
  bmlGenerator[elem] = function(block) {
    const field = block.getFieldValue(elem.split(/_/)[2].toUpperCase()) === '' ? '' : ' ' + elem.split(/_/)[2] + '=\"' + block.getFieldValue(elem.split(/_/)[2].toUpperCase()) + '\"';
    const code = field + bmlGenerator.valueToCode(block, 'NEXT', bmlGenerator.PRECEDENCE);
    return [code, bmlGenerator.PRECEDENCE];
  }
});

attr_block.forEach(elem => {
  bmlGenerator[elem] = function(block) {
    const field = block.getFieldValue(elem.split(/_/)[2].toUpperCase()) === '' ? '' : ' ' + elem.split(/_/)[2] + '=\"' + block.getFieldValue(elem.split(/_/)[2].toUpperCase()) + '\"';
    const code = field + bmlGenerator.valueToCode(block, 'NEXT', bmlGenerator.PRECEDENCE);
    return [code, bmlGenerator.PRECEDENCE];
  }
});

attr_location.forEach(elem => {
  bmlGenerator[elem] = function(block) {
    const field = block.getFieldValue(elem.split(/_/)[2].toUpperCase()) === '' ? '' : ' ' + elem.split(/_/)[2] + '=\"' + block.getFieldValue(elem.split(/_/)[2].toUpperCase()) + '\"';
    const code = field + bmlGenerator.valueToCode(block, 'NEXT', bmlGenerator.PRECEDENCE);
    return [code, bmlGenerator.PRECEDENCE];
  }
});

/*bmlGenerator['attr_set_id'] = function(block) {
  const id = block.getFieldValue('ID') === '' ? '' : ' ' + block.getFieldValue('ID');
  const code = id + bmlGenerator.valueToCode(block, 'NEXT', bmlGenerator.PRECEDENCE);
  return [code, bmlGenerator.PRECEDENCE];
}

bmlGenerator['attr_set_by'] = function(block) {
  const id = block.getFieldValue('BY') === '' ? '' : ' ' + block.getFieldValue('BY');
  const code = id + bmlGenerator.valueToCode(block, 'NEXT', bmlGenerator.PRECEDENCE);
  return [code, bmlGenerator.PRECEDENCE];
}*/

/*bmlGenerator['location'] = function(block) {
  const statement_members =
      bmlGenerator.statementToCode(block, 'MEMBERS');
  const code = '<location' + bmlGenerator.valueToCode(block, 'MEMBER_VALUE', codelabGenerator.PRECEDENCE) + statement_members + '</location>';
  return [code, bmlGenerator.PRECEDENCE];
};*/