import React from 'react'

import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker'

import type { IInputCalendarRangeComponentProps } from '@/presentation/components/Inputs/CalendarRange/InputCalendarRangeComponent.types'
import { useInputCalendarRangeComponent } from '@/presentation/components/Inputs/CalendarRange/InputCalendarRangeComponent.rules'

export const InputCalendarRangeComponent: React.FC<
  IInputCalendarRangeComponentProps
> = props => {
  const { pickerValue, handleDateChange, daySlot, disableDate } =
    useInputCalendarRangeComponent(props)

  return (
    <StaticDatePicker
      disabled={props.disabled}
      displayStaticWrapperAs="desktop"
      disablePast={props.disabledPast}
      slotProps={{ actionBar: { actions: [] } }}
      value={pickerValue}
      onChange={handleDateChange}
      slots={{ day: daySlot }}
      shouldDisableDate={disableDate}
      localeText={{ toolbarTitle: props.label || 'Select date range' }}
    />
  )
}
