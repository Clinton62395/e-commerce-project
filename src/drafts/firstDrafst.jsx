import React from "react";

export const firstDrafst = () => {
  return (
    <div>
      <button className="flex items-center px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">
        <Filter size={18} className="mr-2" />
        Filtrer
      </button>
      <select className="px-4 py-2 border rounded-lg">
        <option>Toutes catégories</option>
        <option>Hommes</option>
        <option>Femmes</option>
        <option>Enfants</option>
      </select>
    </div>
  );
};
