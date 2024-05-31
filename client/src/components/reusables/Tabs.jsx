import React from "react";

const Tabs = ({ heading, tab1, tab2, comp1, comp2, comp3 }) => {
  return (
    <div className="">
      <header className="mb-6">
        <h1 className="text-2xl font-mont font-bold mb-6">{heading}</h1>

        <hr className="border border-neutral" />

        <div role="tablist" className="tabs tabs-lifted mt-8">
          <input
            type="radio"
            name="my_tabs_2"
            role="tab"
            className="tab [--tab-bg:#140e0e] [--tab-border-color:#1b332b] font-mont font-semibold"
            aria-label={tab1}
            defaultChecked
          />
          <div
            role="tabpanel"
            className="tab-content bg-base-300 border-neutral rounded-box p-6"
          >
            {comp1}
          </div>

          <input
            type="radio"
            name="my_tabs_2"
            role="tab"
            className="tab [--tab-bg:#140e0e] [--tab-border-color:#1b332b] font-mont font-semibold"
            aria-label={tab2}
          />
          <div
            role="tabpanel"
            className="tab-content bg-base-300 border-neutral rounded-box p-6"
          >
            {comp2}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Tabs;
