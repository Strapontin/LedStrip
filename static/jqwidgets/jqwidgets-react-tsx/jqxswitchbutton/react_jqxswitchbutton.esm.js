import * as jqxcore from '../../jqwidgets/jqxcore';
import * as jqxswitchbutton from '../../jqwidgets/jqxswitchbutton';
import { createElement, PureComponent } from 'react';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var JqxSwitchButton = /** @class */ (function (_super) {
    __extends(JqxSwitchButton, _super);
    function JqxSwitchButton(props) {
        var _this = _super.call(this, props) || this;
        /* tslint:disable:variable-name */
        _this._jqx = JQXLite;
        _this._id = 'JqxSwitchButton' + _this._jqx.generateID();
        _this._componentSelector = '#' + _this._id;
        _this.state = { lastProps: props };
        return _this;
    }
    JqxSwitchButton.getDerivedStateFromProps = function (props, state) {
        var areEqual = Object.is(props, state.lastProps);
        if (!areEqual) {
            var newState = { lastProps: props };
            return newState;
        }
        return null;
    };
    JqxSwitchButton.prototype.componentDidUpdate = function () {
        var widgetOptions = this._manageProps();
        this.setOptions(widgetOptions);
    };
    JqxSwitchButton.prototype.componentDidMount = function () {
        if (this.props.autoCreate) {
            this._createComponent();
        }
    };
    JqxSwitchButton.prototype.render = function () {
        return (createElement("div", { id: this._id, className: this.props.className, style: this.props.style }, this.props.children));
    };
    JqxSwitchButton.prototype.createComponent = function (options) {
        if (!this.props.autoCreate) {
            this._createComponent(options);
        }
        else {
            /* tslint:disable:no-console */
            console.warn('Component is already created! If you want to use createComponent, please set "autoCreate" prop to "false".');
        }
    };
    JqxSwitchButton.prototype.setOptions = function (options) {
        this._jqx(this._componentSelector).jqxSwitchButton(options);
    };
    JqxSwitchButton.prototype.getOptions = function (option) {
        return this._jqx(this._componentSelector).jqxSwitchButton(option);
    };
    JqxSwitchButton.prototype.addEventListener = function (name, callbackFn) {
        this._jqx(this._componentSelector).on(name, callbackFn);
    };
    JqxSwitchButton.prototype.removeEventListener = function (name) {
        this._jqx(this._componentSelector).off(name);
    };
    JqxSwitchButton.prototype.check = function () {
        this._jqx(this._componentSelector).jqxSwitchButton('check');
    };
    JqxSwitchButton.prototype.disable = function () {
        this._jqx(this._componentSelector).jqxSwitchButton('disable');
    };
    JqxSwitchButton.prototype.enable = function () {
        this._jqx(this._componentSelector).jqxSwitchButton('enable');
    };
    JqxSwitchButton.prototype.toggle = function () {
        this._jqx(this._componentSelector).jqxSwitchButton('toggle');
    };
    JqxSwitchButton.prototype.uncheck = function () {
        this._jqx(this._componentSelector).jqxSwitchButton('uncheck');
    };
    JqxSwitchButton.prototype.val = function (value) {
        return this._jqx(this._componentSelector).jqxSwitchButton('val', value);
    };
    JqxSwitchButton.prototype._createComponent = function (options) {
        var widgetOptions = options ? options : this._manageProps();
        this._jqx(this._componentSelector).jqxSwitchButton(widgetOptions);
        this._wireEvents();
    };
    JqxSwitchButton.prototype._manageProps = function () {
        var widgetProps = ['checked', 'disabled', 'height', 'orientation', 'onLabel', 'offLabel', 'thumbSize', 'rtl', 'width'];
        var options = {};
        for (var prop in this.props) {
            if (widgetProps.indexOf(prop) !== -1) {
                options[prop] = this.props[prop];
            }
        }
        return options;
    };
    JqxSwitchButton.prototype._wireEvents = function () {
        for (var prop in this.props) {
            if (prop.indexOf('on') === 0) {
                var originalEventName = prop.slice(2);
                originalEventName = originalEventName.charAt(0).toLowerCase() + originalEventName.slice(1);
                this._jqx(this._componentSelector).on(originalEventName, this.props[prop]);
            }
        }
    };
    JqxSwitchButton.defaultProps = {
        autoCreate: true
    };
    return JqxSwitchButton;
}(PureComponent));
var jqx = window.jqx;
var JQXLite = window.JQXLite;
var jqwidgets = window.jqwidgets;

export default JqxSwitchButton;
export { jqx, JQXLite, jqwidgets };
