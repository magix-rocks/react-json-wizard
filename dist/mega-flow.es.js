import React, { useState, Fragment, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { TextButton, Input, ItemSelect, TextArea, Stepper, ReactSelect, PriceField, FilePond, FileUpload, ToggleSwitch, Radio, Checkbox, BorderedRadio, Select, FormDatepicker, FormRow, Divider, H4, Tooltip, Icon, Alert, OutlineButton, AppContainer, RocksKitTheme, Wizard, RocksKitIcons } from '@licenserocks/kit';
import { useFormContext, useFieldArray, useForm, FormProvider } from 'react-hook-form';
import PropTypes from 'prop-types';
import 'react-masonry-css';
import { faDownload, faHashtag, faTrash } from '@fortawesome/free-solid-svg-icons';

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };
  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

var _excluded$1 = ["conditions", "defaultValue", "name", "required", "type", "options"];

var mapFieldTypeToComponent = function mapFieldTypeToComponent(fieldType) {
  switch (fieldType) {
    case "datepicker":
      return FormDatepicker;

    case "select":
      return Select;

    case "borderedRadio":
      return BorderedRadio;

    case "checkbox":
      return Checkbox;

    case "radio":
      return Radio;

    case "toggleSwitch":
      return ToggleSwitch;

    case "fileUpload":
      return FileUpload;

    case "filePond":
      return FilePond;

    case "price":
      return PriceField;

    case "reactSelect":
      return ReactSelect;

    case "stepper":
      return Stepper;

    case "textArea":
      return TextArea;

    case "itemSelect":
      return ItemSelect;

    default:
      return Input;
  }
};

var FormField = function FormField(_ref) {
  var data = _ref.data,
      field = _ref.field,
      hasError = _ref.hasError,
      isRecurring = _ref.isRecurring,
      recurringIndex = _ref.recurringIndex,
      stepIndex = _ref.stepIndex,
      fieldId = _ref.fieldId,
      rowId = _ref.rowId,
      stepData = _ref.stepData;
      _ref.merchandise;

  var _useFormContext = useFormContext(),
      control = _useFormContext.control,
      setValue = _useFormContext.setValue,
      register = _useFormContext.register,
      watch = _useFormContext.watch;

  field.conditions;
      var defaultValue = field.defaultValue,
      name = field.name,
      required = field.required,
      type = field.type,
      options = field.options,
      others = _objectWithoutPropertiesLoose(field, _excluded$1);

  if (type === "link") return /*#__PURE__*/React.createElement(TextButton, others);
  var Field = mapFieldTypeToComponent(type);
  var fieldKey = "step-" + stepIndex + "-row-" + rowId + "-field-" + fieldId;
  var fieldName = isRecurring ? data.name + "[" + recurringIndex + "]." + name : name;
  var prevValue = isRecurring && stepData[data.name] && stepData[data.name][recurringIndex] ? stepData[data.name][recurringIndex][name] : stepData[name];

  if ((field == null ? void 0 : field.currencies) !== undefined) {
    field.currencies = stepData == null ? void 0 : stepData.currencies;
  }

  return /*#__PURE__*/React.createElement(Field, _extends({
    control: control,
    defaultValue: prevValue || defaultValue,
    hasError: hasError,
    isRequired: required,
    key: fieldKey,
    name: fieldName,
    register: register({
      required: required
    }),
    setValue: setValue,
    options: options,
    type: type,
    value: watch(fieldName)
  }, others));
};
FormField.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    recurring: PropTypes.bool,
    rows: PropTypes.arrayOf(PropTypes.shape({}))
  }).isRequired,
  field: PropTypes.shape({
    conditions: PropTypes.arrayOf(PropTypes.string),
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    name: PropTypes.string,
    required: PropTypes.string,
    type: PropTypes.string
  }).isRequired,
  fieldId: PropTypes.number.isRequired,
  hasError: PropTypes.bool.isRequired,
  isRecurring: PropTypes.bool.isRequired,
  recurringIndex: PropTypes.number,
  stepIndex: PropTypes.number.isRequired,
  stepData: PropTypes.shape({}).isRequired,
  rowId: PropTypes.number.isRequired
};
FormField.defaultProps = {
  recurringIndex: null
};

var getConditionValues = function getConditionValues(conditions, watch, wizardData, isRecurring, recurringName) {
  var name = conditions.map(function (c) {
    if (c.includes(":")) {
      var _c$split = c.split(":"),
          n = _c$split[0];

      return n;
    }

    return c;
  });
  return watch(isRecurring ? [recurringName] : name, wizardData);
};

var checkCondition = function checkCondition(conditions, watch, wizardData, isRecurring, recurringName, recurringIndex) {
  var hasConditions = conditions && conditions.length > 0;

  if (hasConditions) {
    var _conditionValues$recu;

    var conditionValues = getConditionValues(conditions, watch, wizardData, isRecurring, recurringName);
    var target = isRecurring ? conditionValues == null ? void 0 : (_conditionValues$recu = conditionValues[recurringName]) == null ? void 0 : _conditionValues$recu[recurringIndex] : conditionValues;

    if (conditionValues && target) {
      return conditions.some(function (c) {
        var _target$c;

        if (c.includes(":")) {
          var _target$name;

          var _c$split2 = c.split(":"),
              name = _c$split2[0],
              value = _c$split2[1],
              not = _c$split2[2];

          var isTrue = target[name] === value || Array.isArray(value) && ((_target$name = target[name]) == null ? void 0 : _target$name.includes(value)) || value === "true" && Boolean(target[name]);
          if (not) return !isTrue;
          return isTrue;
        }

        return ((_target$c = target[c]) == null ? void 0 : _target$c.length) > 0 || !!target[c];
      });
    }
  }

  return true;
};

var StyledRow = styled(FormRow).withConfig({
  displayName: "FormRows__StyledRow",
  componentId: "sc-1knzxbr-0"
})(["&&{label{:only-child{display:none;}}}background-color:", ";&&{", "}"], function (_ref) {
  var theme = _ref.theme;
  return theme.palette.gray.light;
}, function (_ref2) {
  var backgroundStyle = _ref2.backgroundStyle;
  return backgroundStyle === "primary" && css(["background-color:", ";"], function (_ref3) {
    var theme = _ref3.theme;
    return theme.palette.common.white;
  });
});
var StyledDivider = styled(Divider).withConfig({
  displayName: "FormRows__StyledDivider",
  componentId: "sc-1knzxbr-1"
})(["&&{", "}"], function (_ref4) {
  var backgroundStyle = _ref4.backgroundStyle;
  return backgroundStyle === "primary" && css(["background-color:", ";"], function (_ref5) {
    var theme = _ref5.theme;
    return theme.palette.common.white;
  });
});
var Hint = styled.span.withConfig({
  displayName: "FormRows__Hint",
  componentId: "sc-1knzxbr-2"
})(["background:#f0f0f4;border-radius:100%;width:20px;height:20px;display:inline-flex;align-items:center;justify-content:center;margin-left:8px;vertical-align:middle;svg{color:#8685a6;font-size:10px;}"]);
var FormRows = function FormRows(_ref6) {
  var data = _ref6.data,
      index = _ref6.index,
      isRecurring = _ref6.isRecurring,
      rows = _ref6.rows,
      stepIndex = _ref6.stepIndex,
      stepData = _ref6.stepData,
      merchandise = _ref6.merchandise;

  var _useFormContext = useFormContext(),
      errors = _useFormContext.errors,
      watch = _useFormContext.watch;

  var _useState = useState(false),
      expanded = _useState[0],
      setExpanded = _useState[1];

  var showExpandButton = rows == null ? void 0 : rows.some(function (row) {
    return row.expandable;
  });
  return /*#__PURE__*/React.createElement(React.Fragment, null, rows == null ? void 0 : rows.map(function (row, idx) {
    var _row$marginBottom, _row$fields;

    var rowKey = "step-" + stepIndex + "-row-" + idx;
    var rowErrors = [];
    var rowConditions = checkCondition(row.conditions, watch, stepData, isRecurring, data.name, index);
    if (!rowConditions) return null;
    if (row != null && row.heading) return /*#__PURE__*/React.createElement(H4, {
      content: row == null ? void 0 : row.heading,
      px: 4,
      mt: 4,
      mb: 2
    });
    var showRow = row.expandable ? expanded : true;
    var label = [].concat(row.label || []);
    if (row.hint) label.push( /*#__PURE__*/React.createElement(Tooltip, {
      content: row.hint,
      contentProps: {
        fontStyle: "normal"
      }
    }, /*#__PURE__*/React.createElement(Hint, null, /*#__PURE__*/React.createElement(Icon, {
      icon: "question"
    }))));
    return /*#__PURE__*/React.createElement(Fragment, {
      key: rowKey
    }, /*#__PURE__*/React.createElement(StyledRow, {
      errors: rowErrors,
      label: label.length > 0 ? label : null,
      labelAlign: row.labelAlign,
      labelGutter: row.labelGutter,
      mb: 0,
      pb: (_row$marginBottom = row == null ? void 0 : row.marginBottom) != null ? _row$marginBottom : 4,
      pt: 4,
      px: 16,
      show: showRow,
      backgroundStyle: row == null ? void 0 : row.backgroundStyle
    }, row.message && /*#__PURE__*/React.createElement(Alert, {
      color: row.messageColor,
      content: row.message,
      mb: 2
    }), (_row$fields = row.fields) == null ? void 0 : _row$fields.map(function (field, fieldId) {
      var _errors$data$name$ind, _errors$field$name;

      var error = isRecurring && errors[data.name] && errors[data.name][index] ? (_errors$data$name$ind = errors[data.name][index][field.name]) == null ? void 0 : _errors$data$name$ind.message : (_errors$field$name = errors[field.name]) == null ? void 0 : _errors$field$name.message;
      if (error) rowErrors.push(error);
      var showIfHasCondition = checkCondition(field.conditions, watch, stepData, isRecurring, data.name, index);
      if (!showIfHasCondition) return null;
      return /*#__PURE__*/React.createElement(FormField, {
        data: data,
        field: field,
        fieldId: fieldId,
        hasError: !!error,
        isRecurring: isRecurring,
        recurringIndex: index,
        rowId: idx,
        stepIndex: stepIndex,
        stepData: stepData,
        merchandise: (field == null ? void 0 : field.name) === "selectMerchIds" ? merchandise : null
      });
    })), (row == null ? void 0 : row.divider) && /*#__PURE__*/React.createElement(StyledDivider, {
      backgroundStyle: row == null ? void 0 : row.backgroundStyle,
      py: row == null ? void 0 : row.dividerSize,
      px: 5,
      m: 0,
      pb: 4
    }));
  }), showExpandButton && /*#__PURE__*/React.createElement(OutlineButton, {
    color: "secondary",
    onClick: function onClick() {
      return setExpanded(function (prev) {
        return !prev;
      });
    },
    size: "sm"
  }, expanded ? "Hide Optional Params" : "Show Optional Params"));
};
FormRows.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    recurring: PropTypes.bool,
    rows: PropTypes.arrayOf(PropTypes.shape({}))
  }).isRequired,
  stepIndex: PropTypes.number.isRequired,
  stepData: PropTypes.shape({}).isRequired,
  index: PropTypes.number.isRequired,
  isRecurring: PropTypes.bool.isRequired,
  rows: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};
FormRows.defaultProps = {};

var Wrapper$1 = styled.div.withConfig({
  displayName: "Form__Wrapper",
  componentId: "sc-11kuada-0"
})(["padding:", ";background-color:", ";border:1px solid ", ";border-radius:16px;margin:", ";&&{", "}"], function (_ref) {
  var theme = _ref.theme;
  return theme.spacing(2, 2, 2, 6);
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.palette.gray.light;
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.palette.gray.regular;
}, function (_ref4) {
  var theme = _ref4.theme;
  return theme.spacing(5);
}, function (_ref5) {
  var disabled = _ref5.disabled;
  return disabled && css(["opacity:0.5;cursor:not-allowed !important;pointer-events:none;"]);
});
var ButtonsWrapper = styled.div.withConfig({
  displayName: "Form__ButtonsWrapper",
  componentId: "sc-11kuada-1"
})(["display:flex;align-items:center;justify-content:flex-end;margin-bottom:8px;"]);

var Form = function Form(_ref6) {
  var data = _ref6.data,
      defaultValues = _ref6.defaultValues,
      stepIndex = _ref6.stepIndex,
      stepFormData = _ref6.stepFormData,
      merchandise = _ref6.merchandise;
  var isRecurring = data.recurring;

  var _useFieldArray = useFieldArray({
    name: isRecurring ? data == null ? void 0 : data.name : ""
  }),
      fields = _useFieldArray.fields,
      append = _useFieldArray.append,
      remove = _useFieldArray.remove;

  var renderRows = function renderRows(index) {
    return /*#__PURE__*/React.createElement(FormRows, {
      data: data,
      index: index,
      isRecurring: isRecurring,
      rows: data.rows,
      stepIndex: stepIndex,
      stepData: stepFormData,
      merchandise: merchandise
    });
  };

  var renderRecurring = function renderRecurring() {
    return /*#__PURE__*/React.createElement(React.Fragment, null, fields.map(function (item, idx) {
      var _defaultValues$data$n, _defaultValues$data$n2;

      var disabled = defaultValues == null ? void 0 : (_defaultValues$data$n = defaultValues[data.name]) == null ? void 0 : (_defaultValues$data$n2 = _defaultValues$data$n[idx]) == null ? void 0 : _defaultValues$data$n2.disabled;
      return /*#__PURE__*/React.createElement(Wrapper$1, {
        key: item.id,
        disabled: disabled
      }, /*#__PURE__*/React.createElement(ButtonsWrapper, null, disabled && /*#__PURE__*/React.createElement(Alert, {
        content: "This is a default item and can't be removed/changed.",
        mr: 2
      }), /*#__PURE__*/React.createElement(OutlineButton, {
        color: "danger",
        disabled: disabled,
        onClick: function onClick() {
          return remove(idx);
        },
        size: "sm"
      }, /*#__PURE__*/React.createElement(Icon, {
        icon: "trash",
        prefix: "fa"
      }))), renderRows(idx));
    }), /*#__PURE__*/React.createElement(TextButton, {
      content: "+ Add item",
      onClick: append,
      size: "sm"
    }));
  };

  return isRecurring ? renderRecurring() : renderRows();
};

Form.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    recurring: PropTypes.bool,
    rows: PropTypes.arrayOf(PropTypes.shape({}))
  }).isRequired,
  stepIndex: PropTypes.number.isRequired,
  stepFormData: PropTypes.shape({})
};
Form.defaultProps = {
  stepFormData: {}
};

var MegaFlowIcons = {
  faDownload: faDownload,
  faHashtag: faHashtag,
  faTrash: faTrash
};

var MegaFlowPropTypes = {
  defaultValues: PropTypes.shape({}),
  icons: PropTypes.arrayOf(PropTypes.shape()),
  schema: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  onFinish: PropTypes.func,
  onStepSubmit: PropTypes.func,
  renderActionButtons: PropTypes.func,
  theme: PropTypes.shape(),
  watcher: PropTypes.func,
  watchList: PropTypes.arrayOf(PropTypes.string),
  wizardProps: PropTypes.shape(),
  wrapperProps: PropTypes.shape()
};
var MegaFlowDefaultProps = {
  defaultValues: {},
  icons: [],
  onFinish: function onFinish() {},
  renderActionButtons: function renderActionButtons() {},
  watchList: []
};

var _excluded = ["defaultValues", "icons", "schema", "onFinish", "onStepSubmit", "renderActionButtons", "theme", "watcher", "livePreview", "wizardProps", "wrapperProps"],
    _excluded2 = ["formState", "getValues", "handleSubmit"];
var Wrapper = styled.div.withConfig({
  displayName: "src__Wrapper",
  componentId: "sc-osiobx-0"
})(["background-color:", ";"], function (_ref) {
  var theme = _ref.theme;
  return theme.palette.gray.light;
});

var getOutputData = function getOutputData(output) {
  return Object.values(output).reduce(function (obj, acc) {
    return _extends({}, obj, acc);
  }, {});
};

var getHiddenValues = function getHiddenValues(array, key) {
  var initialValue = {};
  return array.reduce(function (obj, item) {
    var _extends2;

    return _extends({}, obj, (_extends2 = {}, _extends2[item["name"]] = item == null ? void 0 : item.value, _extends2));
  }, initialValue);
};

var MegaFlow = function MegaFlow(_ref2) {
  var defaultValues = _ref2.defaultValues,
      icons = _ref2.icons,
      schema = _ref2.schema,
      onFinish = _ref2.onFinish,
      onStepSubmit = _ref2.onStepSubmit,
      _renderActionButtons = _ref2.renderActionButtons,
      theme = _ref2.theme,
      watcher = _ref2.watcher,
      livePreview = _ref2.livePreview,
      wizardProps = _ref2.wizardProps,
      wrapperProps = _ref2.wrapperProps,
      props = _objectWithoutPropertiesLoose(_ref2, _excluded);

  // Parse if schema was type of JSON string
  var parsedSchema = typeof schema === "string" ? JSON.parse(schema) : schema;
  var steps = parsedSchema.steps,
      hiddenValues = parsedSchema.hiddenValues;

  var _useState = useState(0),
      currentStep = _useState[0],
      setCurrentStep = _useState[1];

  var isCurrentLastStep = currentStep === steps.length - 1;

  var _useState2 = useState({}),
      wizardData = _useState2[0],
      setWizardData = _useState2[1];

  var _useState3 = useState({}),
      hiddenData = _useState3[0],
      setHiddenData = _useState3[1];

  var _useForm = useForm();
      _useForm.formState;
      var getValues = _useForm.getValues,
      handleSubmit = _useForm.handleSubmit,
      methods = _objectWithoutPropertiesLoose(_useForm, _excluded2);

  var stepFormData = wizardData[currentStep] || defaultValues;
  useEffect(function () {
    methods.reset(stepFormData); // set hidden values to include in output, without displaying

    if (hiddenValues && currentStep === 0) {
      setHiddenData(getHiddenValues(hiddenValues));
    }

    if (watcher) {
      watcher(getOutputData(wizardData));
    }
  }, [currentStep]);

  var onSubmit = function onSubmit(data) {
    var _extends3;

    var currentState = _extends({
      hiddenData: hiddenData
    }, wizardData, (_extends3 = {}, _extends3[currentStep] = data, _extends3)); // Set step data in global wizard object


    setWizardData(currentState); // Send step data to props

    if (onStepSubmit) onStepSubmit(data);

    if (!isCurrentLastStep) {
      setCurrentStep(function (prev) {
        return prev + 1;
      });
    } else {
      onFinish(getOutputData(currentState));
    }
  };

  var stepsArray = steps.map(function (st) {
    return {
      title: st.title
    };
  });

  var renderForm = function renderForm() {
    return /*#__PURE__*/React.createElement(Form, {
      data: steps[currentStep],
      key: currentStep,
      stepIndex: currentStep,
      stepFormData: stepFormData,
      defaultValues: defaultValues,
      merchandise: props.merchandise
    });
  };

  return /*#__PURE__*/React.createElement(AppContainer, {
    icons: _extends({}, RocksKitIcons, MegaFlowIcons, icons),
    theme: theme || RocksKitTheme()
  }, /*#__PURE__*/React.createElement(Wrapper, wrapperProps, /*#__PURE__*/React.createElement("form", {
    onBlur: function onBlur(event) {
      event.preventDefault();
      var values = getValues();
      var data = Object.assign(values, hiddenData);

      if (livePreview) {
        livePreview(data);
      }
    },
    onSubmit: handleSubmit(onSubmit)
  }, /*#__PURE__*/React.createElement(FormProvider, methods, /*#__PURE__*/React.createElement(Wizard, _extends({
    currentStepContent: renderForm(),
    currentStepIndex: currentStep,
    renderActionButtons: function renderActionButtons() {
      return _renderActionButtons(getOutputData(wizardData));
    },
    setCurrentStepIndex: setCurrentStep,
    steps: stepsArray,
    backgroundStyle: "primary"
  }, wizardProps, props))))));
};

MegaFlow.propTypes = MegaFlowPropTypes;
MegaFlow.defaultProps = MegaFlowDefaultProps;

export { MegaFlow as default };
//# sourceMappingURL=mega-flow.es.js.map
