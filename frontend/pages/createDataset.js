import React from "react";
import AddDatasetForm from "../components/AddDatasetForm";
import PrimarySearchAppBar from "../components/SearchBar";

export default function createDataSet() {
    return (
        <div>
            <PrimarySearchAppBar/>
            <br/><br/>
            <AddDatasetForm />
        </div>
    );
}