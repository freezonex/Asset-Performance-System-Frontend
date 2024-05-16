import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import styles from './index.module.scss';

function CalendarComp(props) {
  const { range, changeState } = props;

  const handleSelect = (obj) => {
    changeState({
      range: obj,
    });
  };

  return (
    <div className={styles.calendar}>
      <DayPicker
        mode="range"
        selected={range}
        onSelect={handleSelect}
        showOutsideDays
      />
    </div>
  );
}

export default CalendarComp;
