import React from 'react'
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded'
import {
  InputAdornment,
  Popover,
  Stack,
  TextField,
  Button,
} from '@mui/material'
import { InputCalendarRangeComponent } from '@/presentation/components/Inputs/CalendarRange/InputCalendarRangeComponent'
import type { IInputDateRangeFieldComponentProps } from '@/presentation/components/Inputs/DateRange/InputDateRangeFieldComponent.types'
import { useInputDateRange } from '@/presentation/components/Inputs/DateRange/InputDateRangeFieldComponent.rules'
import { FormatRangeLabelUtil } from '@/application/utils/FormatRangeLabel/FormatRangeLabelUtil'

const DEFAULT_PLACEHOLDER = 'Add dates'

export const DateRangeFieldComponent: React.FC<
  IInputDateRangeFieldComponentProps
> = props => {
  const {
    open,
    anchorEl,
    draftRange,
    handleClick,
    handleKeyDown,
    handleClose,
    handleRangeChange,
    handleApply,
    handleClear,
  } = useInputDateRange(props)

  const adornment = (
    <InputAdornment position="start">
      <CalendarMonthRoundedIcon color="primary" fontSize="small" />
    </InputAdornment>
  )

  return (
    <>
      <TextField
        {...props.textFieldProps}
        value={FormatRangeLabelUtil(
          props.value,
          props.placeholder || DEFAULT_PLACEHOLDER,
        )}
        label={props.label}
        placeholder={props.placeholder}
        helperText={props.helperText}
        error={props.error}
        inputProps={{
          readOnly: true,
          tabIndex: -1,
          ...(props.textFieldProps?.inputProps ?? {}),
        }}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        InputProps={{
          ...props.textFieldProps?.InputProps,
          readOnly: true,
          startAdornment:
            props.textFieldProps?.InputProps?.startAdornment ?? adornment,
        }}
      />

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        slotProps={{ paper: { sx: { mt: 1.5, borderRadius: 3, p: 2 } } }}>
        <Stack spacing={2}>
          <InputCalendarRangeComponent
            initialRange={draftRange}
            onRangeChange={handleRangeChange}
            disabledDates={props.disabledDates}
            label={props.label}
          />

          <Stack direction="row" spacing={1} justifyContent="space-between">
            <Button color="inherit" onClick={handleClear}>
              {props.clearLabel}
            </Button>
            <Stack direction="row" spacing={1}>
              <Button onClick={handleClose}>Cancel</Button>
              <Button
                variant="contained"
                onClick={handleApply}
                disabled={!draftRange.checkIn || !draftRange.checkOut}>
                {props.confirmLabel ?? 'Apply'}
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Popover>
    </>
  )
}
