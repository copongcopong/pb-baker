import Handlebars from "handlebars";

export const makeBold = (text: string) =>  new Handlebars.SafeString(`<strong>${Handlebars.escapeExpression(text)}</strong>`);