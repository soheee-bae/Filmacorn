import { Sorting } from "@/icons/index";
import React, { useState, Dispatch } from "react";
import styles from "./SortingDropdown.module.scss";

const sortingLists = [
  { value: "Latest", label: "Latest" },
  { value: "Alphabetical", label: "Alphabetical (A-Z)" },
  { value: "Reverse Alpha", label: "Alphabetical (Z-A)" },
];

interface SortingDropdownProps {
  sorting: string;
  setSorting: Dispatch<string>;
}

export default function SortingDropdown(props: SortingDropdownProps) {
  const { sorting, setSorting } = props;
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const onChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setSorting(ev.target.value);
  };

  return (
    <div className={styles.sortingDropdown}>
      <div className={styles.sortingDropdownValue} onClick={handleOpen}>
        {sorting === "Sort By" ? (
          <>
            Sort By <Sorting />
          </>
        ) : (
          <>
            Sort : {sorting} <Sorting />
          </>
        )}
      </div>
      {open && (
        <div className={styles.sortingDropdownContent}>
          <p className={styles.sortingDropdownTitle}>Sort By</p>
          <div onChange={onChange} className={styles.sortingDropdownLists}>
            {sortingLists.map((list) => (
              <label
                key={list.value}
                className={styles.sortingDropdownList}
                data-checked={sorting === list.value}>
                <input
                  type="radio"
                  name="sorting"
                  value={list.value}
                  checked={sorting === list.value}
                />
                {list.label}
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
