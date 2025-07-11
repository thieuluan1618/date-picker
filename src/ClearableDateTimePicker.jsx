import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';
import ClearIcon from '@mui/icons-material/Clear';


const tomorrow = dayjs().add(1, 'day');

export default function ClearableDateTimePicker() {
  const [value, setValue] = React.useState(tomorrow);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={[
          'DatePicker',
        ]}
      >
        <DemoItem label="DatePicker">
          <DatePicker
            value={value}
            onChange={(newValue) => setValue(newValue)}
            disableFuture
            views={['year', 'month', 'day']}
            slots={{
              clearIcon: ClearIcon,
            }}
            slotProps={{
              field: { clearable: true, onClear: () => setValue(null) },
            }}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}
