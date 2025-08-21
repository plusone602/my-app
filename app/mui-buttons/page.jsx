'use client';

import { useState } from 'react';
import { Button } from '@mui/material';
import { ButtonGroup } from '@mui/material';
import { styled } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { increment, reset } from '@/lib/features/counterSlice';

const StyledButton = styled(Button)(({ theme }) => ({
  '&.Mui-disabled': {
    color: theme.palette.grey[400],
    borderColor: theme.palette.grey[300],
    backgroundColor: theme.palette.action.disabledBackground,
  },
}));

export default function Page() {
  const count = useSelector((s) => s.counter.value);
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(false);

  return (
    <div style={{ minHeight: '60vh', display: 'grid', placeItems: 'center', padding: 36 }}>
      <a href="http://localhost:3000/">回首頁</a>
      <ButtonGroup orientation="vertical" variant="outlined" size="large" style={{ width: 240 }}>
        <StyledButton disabled={disabled} onClick={() => !disabled && dispatch(increment())}>
          {`CLICK: ${count}`}
        </StyledButton>
        <StyledButton onClick={() => dispatch(reset())}>CLEAR</StyledButton>
        <StyledButton
          onClick={() => {
            setDisabled((d) => !d);
          }}
        >
          {disabled ? 'ABLE' : 'DISABLE'}
        </StyledButton>
      </ButtonGroup>
    </div>
  );
}
