import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers-pro';
import ClearIcon from '@mui/icons-material/Clear';
import { TextField } from '@mui/material';

const CustomTextField = (props) => {
  const handleClick = (event) => {
    // Call original onClick if it exists
    if (props.onClick) {
      props.onClick(event);
    }
    
    // Check if click is on or contains MuiPickersSectionList-root
    const sectionListElement = event.target.closest('.MuiPickersSectionList-root');
    if (sectionListElement) {
      logEvent('Click detected via custom TextField');
    }
  };

  const handleKeyDown = (event) => {
    // Call original onKeyDown if it exists
    if (props.onKeyDown) {
      props.onKeyDown(event);
    }
    
    // Check if keydown is on MuiPickersSectionList-root
    const sectionListElement = event.target.closest('.MuiPickersSectionList-root');
    if (sectionListElement) {
      logEvent(`KeyDown via custom TextField: ${event.key}`);
    }
  };

  return (
    <TextField
      {...props}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    />
  );
};


const tomorrow = dayjs().add(1, 'day');

export default function ClearableDateTimePicker() {
  const [value, setValue] = React.useState(tomorrow);
  const [open, setOpen] = React.useState(false);
  const test = React.useRef(null);


  const handleOpenChange = (value) => {
    setOpen(value);
  }

  const handleClear = (e) => {
    e.preventDefault();
    setValue(null)
  }

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
              clearButton: () => <div onClick={handleClear}>Clear BUTTON</div>
            }}
            onViewChange={() => {console.log('changeeeeee')}}
            slotProps={{
              textField: {
                clearable: true,
                onClick: (event) => {
                  console.log(event);
                  setOpen(!open);
                  console.log('event => ', event)
                  // console.log('test');
                  
                  // Your click handler logic here
                },
                InputProps: {
                  fullWidth: true,
                  inputRef: test,
                  inputcomponent: () => 'TEST'
                },
                elements: () => <div>TEST</div>
               
              },
              
            }}
          
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}
