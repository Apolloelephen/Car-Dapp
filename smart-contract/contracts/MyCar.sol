// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MyCar {
    struct Car {
        string color;
        string brand;
        string model;
    }

    Car myCar;

    function placeCarOrder(string memory newColor, string memory newBrand, string memory newModel) external {
        myCar = Car(newColor, newBrand, newModel);
    }

    function getCarOrder() external view returns (Car memory) {
        return myCar;
    }
}
