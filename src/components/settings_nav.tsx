import { Card, Tab, TabList, DateRangePicker, DateRangePickerItem, DateRangePickerValue } from '@tremor/react'

interface SettingNavProps {
  tabs: {
    name: string
  }[]
  onDatePick: (value: DateRangePickerValue) => void
  dateValue: DateRangePickerValue
}

export default function SettingNav({ tabs, onDatePick, dateValue }: SettingNavProps) {
  const today = new Date()
  const startTracking = new Date(2024, 3, 15)

  return (
    <Card className="flex flex-col md:flex-row items-stretch md:items-center gap-4 md:justify-between">
      <TabList variant="solid" className="w-full rounded-tremor-small md:w-60">
        {tabs.map((tab) => (
          <Tab
            key={tab.name}
            className="w-full justify-center ui-selected:text-tremor-content-strong ui-selected:dark:text-dark-tremor-content-strong"
          >
            {tab.name}
          </Tab>
        ))}
      </TabList>
      <DateRangePicker
        className="flex max-w-full xl:max-w-md"
        value={dateValue}
        onValueChange={onDatePick}
        selectPlaceholder="Select range time"
        color="rose"
        maxDate={today}
        minDate={startTracking}
      >
        <DateRangePickerItem key="today" value="today" from={today}>
          Today
        </DateRangePickerItem>
        <DateRangePickerItem key="last week" value="last week" from={new Date(2023, 0, 1)}>
          Last Week
        </DateRangePickerItem>
        <DateRangePickerItem key="last month" value="last month" from={new Date(2023, 0, 1)}>
          Last Month
        </DateRangePickerItem>
      </DateRangePicker>
    </Card>
  )
}
