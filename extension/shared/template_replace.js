/* TICKET-419: Template variable replacement engine */
function replaceInTemplate(template, variablesMap) {
  if (!window.TemplateParser || !window.TemplateParser.replaceVariables) {
    return { error: 'PARSER_UNAVAILABLE' };
  }
  return window.TemplateParser.replaceVariables(template, variablesMap);
}
window.TemplateReplace = { replaceInTemplate };


