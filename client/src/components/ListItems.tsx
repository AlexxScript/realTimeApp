import React from "react";

interface LunchListProps {
  data: any[]; // Adjust the type based on your actual data structure
}

export const ListItems: React.FC<LunchListProps> = ({ data }) => {
  return (
    <ul>
      {data.map((item, index) => (
        <li key={index}>
          {item.item_name} - {item.description} - {item.price} -{" "}
          {item.available.toString()}
        </li>
      ))}
    </ul>
  );
};
