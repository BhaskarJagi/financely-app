import { Card, Row } from "antd";
import React from "react";
import "./styles.css";
import Button from "../Button";

function Cards({ showExpenseModal, showIncomeModal }) {
  return (
    <div>
      <Row className="my-row">
        <Card className="my-card" title="Current Balnace">
          <p>₹0</p>
          <Button text="Reset Balance" blue={true} />
        </Card>

        <Card className="my-card" title="Total Income">
          <p>₹0</p>
          <Button text="Add Income" blue={true} onClick={showIncomeModal}/>
        </Card>

        <Card className="my-card" title="Total Expense">
          <p>₹0</p>
          <Button text="Add Expense" blue={true} onClick={showExpenseModal} />
        </Card>
      </Row>
    </div>
  );
}

export default Cards;
