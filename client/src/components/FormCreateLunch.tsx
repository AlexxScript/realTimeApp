import React, { ChangeEvent, useState } from "react";

interface CreateLunchFormProps {
  onSubmit: (formData: any) => void;
}

export const FormCreateLunch: React.FC<CreateLunchFormProps> = ({ onSubmit }) => {
  const [fields, setFields] = useState({
    nameLunch: "",
    descriptionLunch: "",
    priceLunch: 0,
    availableLunch: false,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFields((prevFields) => ({
      ...prevFields,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleChangeText = (e:ChangeEvent<HTMLTextAreaElement>) => {
    setFields((prevField) => ({
        ...prevField,
        descriptionLunch:e.target.value
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(fields);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="nameLunch">Lunch name</label>
        <input
          onChange={handleChange}
          value={fields.nameLunch}
          type="text"
          name="nameLunch"
        />
      </div>
      <div>
        <label htmlFor="descriptionLunch">Lunch description</label>
        <textarea
          onChange={handleChangeText}
          value={fields.descriptionLunch}
          name="descriptionLunch"
        />
      </div>
      <div>
        <label htmlFor="priceLunch">Lunch price</label>
        <input
          onChange={handleChange}
          value={fields.priceLunch}
          type="number"
          name="priceLunch"
        />
      </div>
      <div>
        <label htmlFor="availableLunch">Lunch available</label>
        <input
          onChange={handleChange}
          checked={fields.availableLunch}
          type="checkbox"
          name="availableLunch"
        />
      </div>
      <button type="submit">Create</button>
    </form>
  );
};

