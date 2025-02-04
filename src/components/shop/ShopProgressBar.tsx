import React, { useEffect, useState } from 'react';

interface Props {
  label: string;
  value: number;
  itemValue: number;
  maxValue: number;
};

interface BarValue {
  value: number;
  color: string;
};

const ShopProgressBar: React.FC<Props> = ({ label, value, itemValue, maxValue }) => {
  const [newValue, setNewValue] = useState(0)
  const [differenceValue, setDifferenceValue] = useState(0)
  const [barValues, setBarValues] = useState<BarValue[]>([
    {
      value: 0,
      color: "#e4caa5",
    },
    {
      value: 0,
      color: "#4acd15",
    }
  ]);

  useEffect(() => {

    const difference = value! + itemValue!
    const differenceResult = (difference / maxValue) * 100
    const valueResult = (value! / maxValue) * 100

    setNewValue(valueResult)
    setDifferenceValue(differenceResult)
  }, [value, itemValue]);

  useEffect(() => {
    let newBarValues = [
      {
        value: newValue,
        color: "#e4caa5",
      },
      {
        value: 0,
        color: "#4acd15",
      }
    ];

    if (itemValue) {
      if (itemValue > 0) {
        let valuePercentage = (itemValue / maxValue) * 100
        valuePercentage = valuePercentage < 0 ? 0 : valuePercentage
        //First bar: yellow -> newValue
        //Second bar: green -> valuePercentage
        newBarValues = [
          {
            value: newValue,
            color: "#e4caa5",
          },
          {
            value: valuePercentage,
            color: "#4acd15",
          }
        ]
      } else if (itemValue < 0) {
        const result = newValue - differenceValue
        // First bar: yellow -> differenceValue
        // Second bar: red -> result
        newBarValues = [
          {
            value: newValue,
            color: "#e4caa5",
          },
          {
            value: result,
            color: "#bd1111",
          }
        ]
      }
    }
    setBarValues(newBarValues)
  }, [newValue, differenceValue]);

  return (
    <>
      <div className='flex flex-row place-content-around mr-[2%] mt-[1%] ml-[2%] 2xl:text-3xl lg:text-xl sm:text-base'>
        <p className='w-[38%] text-start'>{label}</p>
        <div className='flex flex-row w-2/4 text-end'>
          {itemValue! > 0
            ? <p className='w-11/12 text-end text-green-500'>{`(+${itemValue})`}</p>
            : itemValue! < 0
              ? <p className='w-11/12 text-end text-rose-600'>{`(${itemValue})`}</p>
              : null
          }
          {itemValue! != 0
            ? <p className='w-1/12 text-end'>{value! + itemValue!}</p>
            : <p className='w-full text-end'>{value! + itemValue!}</p>
          }
        </div>
      </div>
      <div className="flex inline-row ml-[5%] h-[2.5%] w-[90%] bg-gray-200 dark:bg-neutral-600 rounded-full">
        <div className="rounded-l-sm" style={{ backgroundColor: barValues[0].color, width: `${barValues[0].value}%` }} />
        <div className="bg-red-600 rounded-r-sm" style={{ backgroundColor: barValues[1].color, width: `${barValues[1].value}%` }} />
      </div>
    </>
  );
};

export default ShopProgressBar;