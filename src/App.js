
import './App.css';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Button, Checkbox, Slider, Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import copy from "copy-to-clipboard";

function App() {
  const [type, setType] = useState([]);
  const [value, setValue] = useState(10);
  const [password, setPassword] = useState('');
  const [tooltip, setTooltip] = useState(false);
  const [strength, setStrength] = useState(0)
  const [check, setCheck] = useState(
    [{ text: 'Include Uppercase Letters', completed: false, type: 'uppercase' }, { text: 'Include Lowercase Letters', completed: false, type: 'lowercase' }, { text: "Include Numbers", completed: false, type: 'number' }, { text: 'Include Symbol', completed: false, type: 'symbol' }]
  )
  const handleChange = (e, id) => {
    setType(prev => [...prev, e.target.value]);
    const updateCheck = check.map((item, index) => index === id ? { ...item, completed: !item.completed } : item);
    setCheck(updateCheck)
  }

  const handleRange = (e) => {
    setValue(e.target.value);
  }

  const checkStrength = () => {
    let count = 0;
    check.map(item => {
      if (item.completed) {
        count += 1
      }
    })
    setStrength(count)
  }

  const handleCopy = () => {
    copy(password);
    setTooltip(true)
    tooltipCount()
  }

  const tooltipCount = () => {
    setTimeout(() => {
      setTooltip(false)
    }, 1000)
  }

  const PasswordGenerate = () => {
    let Uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXZ';
    let Lowercase = 'abcdefghijklmnopqrstuvwxz';
    let number = '0123456789';
    let symbol = '!@#$%^&*()';
    let password = '';
    let newArr = []

    let checkForPassword = check.map(item => {
      if (item.completed) {
        newArr.push(item.type)
      }
    })

    if (checkForPassword.length > 0) {
      for (let i = 0; i < value; i++) {
        for (let j = 0; j < newArr.length; j++) {
          if (newArr[j] === 'uppercase') password += Uppercase.charAt(Math.floor(Math.random() * Uppercase.length))
          else if (newArr[j] === 'lowercase') password += Lowercase.charAt(Math.floor(Math.random() * Lowercase.length))
          else if (newArr[j] === 'number') password += number.charAt(Math.floor(Math.random() * number.length));
          else if (newArr[j] === 'symbol') password += symbol.charAt(Math.floor(Math.random() * symbol.length));
        }
      }
    }
    const RandomizedString = password.split('').sort(function () { return 0.5 - Math.random() }).slice(0, value + 1).join('');
    setPassword(RandomizedString)
  }
  useEffect(() => {
    checkStrength()
  }, [check, type])
  return (
    <div className="App">
      <div className='generator_container'>
        <h2>Password Generator</h2>

        <div className='password_value flex'>
          <span className='pass_value'>{password ? password : <span style={{ color: "#494753" }}>RT546$37</span>}</span>
          <Tooltip
            onClose={() => handleCopy(false)}
            open={tooltip}
            title="copied"
          >
            <ContentCopyIcon className='copy_icon' onClick={handleCopy} />
          </Tooltip>

        </div>

        <div className='password_range'>
          <div className='range_header flex'>
            <span>Character Length</span>
            <span className='range_value'>{value}</span>
          </div>
          <div className='range'>
            <Slider
              value={value || 0}
              aria-label="Default"
              valueLabelDisplay="auto"
              sx={{ color: "#A5FFAF" }}
              onChange={handleRange}
              style={{ marginBottom: '10px' }}
            />
            <div className='select_range'>
              {
                check?.map((item, index) => (<div key={index} className='range_type'>
                  <Checkbox
                    sx={{
                      color: "#fff",
                      '&.Mui-checked': {
                        color: '#A5FFAF',
                      },
                    }}
                    value={item.type}
                    onChange={(e) => handleChange(e, index)}
                  />
                  <span style={{ color: item.completed ? '#A5FFAF' : '#fff' }}>{item.text}</span>
                </div>))
              }

            </div>
          </div>

          <div className='password_strength flex'>
            <span className=''>Strength</span>
            <div className='strength_level'>
              <span className='strength_value'>{strength > 0 && strength < 2 ? "BASIC" : strength > 1 && strength < 3 ? "MEDIUM" : strength > 2 ? "STRONG" : ""}</span>
              <span style={{ backgroundColor: strength > 0 && "#A5FFAF" }}></span>
              <span style={{ backgroundColor: strength > 1 && "#A5FFAF" }}></span>
              <span style={{ backgroundColor: strength > 3 && "#A5FFAF" }}></span>
            </div>
          </div>

          <div className='btn_box'>
            <Button variant='contained' fullWidth className='genrate_btn' onClick={PasswordGenerate} >
              Generate
              <ArrowForwardIcon className='arrow_icon' style={{ paddingLeft: "20px" }} />
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
