import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers-pro';
import ClearIcon from '@mui/icons-material/Clear';
import { TextField } from '@mui/material';

const tomorrow = dayjs().add(1, 'day');

export default function ClearableDateTimePicker() {
  const [value, setValue] = React.useState(tomorrow);
  const [open, setOpen] = React.useState(false);

  const handleClick = (event) => {
    // Check if click is on or contains MuiPickersSectionList-root
    const sectionListElement = event.target.closest('.MuiPickersSectionList-root');
    if (sectionListElement) {
      setOpen(true);
    }
  };

  // const handleClear = (e) => {
  //   e.preventDefault();
  //   setValue(null)
  // }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={[
          'DatePicker',
        ]}
      >
        <DemoItem label="DatePicker" onClick={() => setOpen(true)}>

          <DatePicker
            value={value}
            onChange={(newValue) => setValue(newValue)}
            open={open}
            onClose={() => setOpen(false)}
            views={['year', 'month', 'day']}
            slots={{
              // clearIcon: () => <div>Clear ICON</div>,
              openPickerButton: () => null,
              clearButton: ClearIcon
            }}
            sx={{
              '& .MuiPickersSectionList-root': {
                // Your custom styles here
                width: 'fit-content',
                '&:hover': {
                  cursor: 'pointer',
                }
              }
            }}
          
            slotProps={{
              textField: {
                clearable: true,
                onClick: (event) => {
                  handleClick(event)// Your click handler logic here
                },
                InputProps: {
                  fullWidth: false,
                },
              },
              
            }}
          
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}
