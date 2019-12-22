import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { StatusBar, Vibration } from 'react-native';
import { StyledButton } from './components/Button';
import { TextInput } from './components/TextInput';

const App = () => {
  const [formValues, setFormValues] = useState({
    categoryIncome: '',
    categoryCost: '',
    income: '',
    cost: '',
  });

  //ARRAYS FOR INCOMES AND COSTS
  const [listIncomes, setListIncomes] = useState([]);
  const addedIncomes = {
    category: formValues.categoryIncome,
    income: formValues.income,
  };

  const [listCosts, setListCosts] = useState([]);
  const addedCosts = {
    category: formValues.categoryCost,
    cost: formValues.cost,
  };

  // FUNCTIONS FOR ADDING INCOMES AND COSTS
  const handleAddIncome = () => {
    setListIncomes([...listIncomes, addedIncomes]);
  };

  const handleAddCost = () => {
    setListCosts([...listCosts, addedCosts]);
  };

  //FUNCTIONS TO CALCULATE INCOMES-COSTS
  const incomesTotal = listIncomes.reduce(
    (totalIncome, item) => totalIncome + parseInt(item.income),
    0
  );

  const costsTotal = listCosts.reduce(
    (totalCost, item) => totalCost + parseInt(item.cost),
    0
  );

  const leftToSpend =
    incomesTotal || costsTotal ? incomesTotal - costsTotal : null;

  //FUNCTION TO CLEAR ALL INPUTS + VIBRATION =)
  const vibeDuration = 600;
  const scroll = React.createRef();
  const clearInput = () => {
    setFormValues({
      categoryIncome: '',
      categoryCost: '',
      income: '',
      cost: '',
    });
    setListIncomes([]);
    setListCosts([]);
    scroll.current.scrollTo(0);
    Vibration.vibrate(vibeDuration);
  };

  return (
    <Container ref={scroll}>
      <StatusBar hidden />
      <TextHeading>SILLY BUDGET APP</TextHeading>

      <StyledView>
        <Text>Where did you get the money?</Text>
        <Picker
          selectedValue={formValues.categoryIncome}
          onValueChange={value =>
            setFormValues({
              ...formValues,
              categoryIncome: value,
            })
          }>
          <Picker.Item label="Pick a category" value="-" />
          <Picker.Item label="Salary" value="Salary" />
          <Picker.Item label="Stole it" value="Stolen money" />
          <Picker.Item label="Borrowed" value="Borrowed" />
          <Picker.Item label="Other" value="Other" />
        </Picker>

        <Text>How much?</Text>
        <TextInput
          onChangeText={text => setFormValues({ ...formValues, income: text })}
          value={formValues.income}
          placeholder="0"
          allowFontScaling
          keyboardType="numeric"
          autoCapitalize
          clearTextOnFocus
        />

        <StyledButton onPress={handleAddIncome}>
          <Text>💰 ADD INCOME 💰</Text>
        </StyledButton>
      </StyledView>

      <StyledView>
        <Text>What do you spend money on?</Text>
        <TextInput
          onChangeText={text =>
            setFormValues({ ...formValues, categoryCost: text })
          }
          value={formValues.categoryCost}
          placeholder="Food, car, diapers.."
          allowFontScaling
          clearTextOnFocus
          autoCapitalize
        />

        <Text>How much?</Text>
        <TextInput
          onChangeText={text => setFormValues({ ...formValues, cost: text })}
          value={formValues.cost}
          placeholder="0"
          keyboardType="numeric"
          allowFontScaling
          clearTextOnFocus
        />

        <StyledButton onPress={handleAddCost}>
          <Text>💸 ADD COST 💸</Text>
        </StyledButton>
      </StyledView>

      {(listIncomes.length > 0 || listCosts.length > 0) && (
        <ViewSummary>
          <TextSummary>YOUR BALANCE:</TextSummary>

          {listIncomes.map((items, index) => (
            <ViewBalance key={index}>
              <TextSumIncomes>{items.category}</TextSumIncomes>
              <TextSumIncomes> {items.income} SEK</TextSumIncomes>
            </ViewBalance>
          ))}

          {listCosts.map((items, index) => (
            <ViewBalance key={index}>
              <TextSumCosts>{items.category}</TextSumCosts>
              <TextSumCosts> -{items.cost} SEK</TextSumCosts>
            </ViewBalance>
          ))}

          {(listIncomes.length > 0 || listCosts.length > 0) && (
            <TextSummary>LEFT TO SPEND: {leftToSpend} SEK</TextSummary>
          )}
          <StyledButton onPress={clearInput}>
            <Text>✌️ TRY AGAIN? ✌️</Text>
          </StyledButton>
        </ViewSummary>
      )}
    </Container>
  );
};

// STYLED-COMPONENTS
const Container = styled.ScrollView`
  font-family: Calibri;
  flex-grow: 1;
  background-color: #232A2A;
  margin: 0;
`;
const StyledView = styled.View`
  margin: 15px 0;
  padding: 15px;
`;
const Text = styled.Text`
  font-size: 20px;
  color: #fff;
  margin-bottom: 5;
  text-align: center;
`;
const TextHeading = styled.Text`
  background-color: #FFA69E;
  font-size: 24px;
  font-weight: bold;
  color: #393D3F;
  padding: 30px 15px;
  text-align: center;
`;
const Picker = styled.Picker`
  minHeight: 40px;
  background-color: #fff;
  margin-bottom: 5px;
  padding: 10px;
`;
const ViewSummary = styled.View`
  background-color: #CED2D2;
  padding: 15px;
`;
const ViewBalance = styled.View`
  flex-direction: row;
  justify-content: space-between;
  font-size: 18px;
`;
const TextSumIncomes = styled.Text`
  font-size: 20px;
  color: #647200;
`;
const TextSumCosts = styled.Text`
  font-size: 20px;
  color: #B83E22;
`;
const TextSummary = styled.Text`
  margin: 10px 0;
  color: #232A2A;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`;

export default App;
