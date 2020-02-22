/*
 * (C) Copyright HCL Technologies Ltd. 2018
 * (C) Copyright IBM Corp. 2012, 2017 All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const BasicEvaluatedExpression = require("webpack/lib/BasicEvaluatedExpression");
const {tap} = require("webpack-plugin-compat").for("webpack-hasjs-plugin");

module.exports = class HasJsPlguin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    tap(compiler, "compilation", (__, params) => {
      tap(params.normalModuleFactory, "parser", (parser) => {
        tap(parser, "evaluate CallExpression", (expr) => {
          if (expr && expr.type === "CallExpression" &&
              expr.callee && expr.callee.name == "has" &&
              expr.arguments && expr.arguments.length === 1 &&
              expr.arguments[0].type === "Literal" && typeof expr.arguments[0].value === 'string') {
            let value = this.options.features[expr.arguments[0].value];
            if (typeof value === 'undefined' && this.options.coerceUndefinedToFalse) {
              value = false;
            }
            if (typeof value !== 'undefined' && value !== null) {
              const result = new BasicEvaluatedExpression().setRange(expr.range);
              switch(typeof value) {
                case "number":
                  return result.setNumber(value);
                case "string":
                  return result.setString(value);
                case "boolean":
                  return result.setBoolean(value);
              }
            }
          }
        });
      });
    });
  }
};
