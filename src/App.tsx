import { useMemo, useState } from 'react'
import './App.css'

type Person = { id: number; name: string; color: string }
type BillItem = { id: number; name: string; price: number; people: number[] }

const initialPeople: Person[] = [
  { id: 1, name: 'Alex', color: '#70459a' },
  { id: 2, name: 'Jamie', color: '#40558f' },
  { id: 3, name: 'Taylor', color: '#713f78' },
]

const initialItems: BillItem[] = [
  { id: 1, name: 'Garlic knots', price: 12, people: [1, 2, 3] },
  { id: 2, name: 'Margherita pizza', price: 24, people: [1, 2, 3] },
  { id: 3, name: 'Drinks', price: 18, people: [2, 3] },
]

const money = (value: number) => `$${value.toFixed(2)}`

function App() {
  const [people, setPeople] = useState(initialPeople)
  const [items, setItems] = useState(initialItems)
  const [tip, setTip] = useState(18)
  const [tax, setTax] = useState(8.5)
  const [newPerson, setNewPerson] = useState('')
  const [newItem, setNewItem] = useState('')
  const [newPrice, setNewPrice] = useState('')
  const [showItemForm, setShowItemForm] = useState(false)

  const subtotal = items.reduce((sum, item) => sum + item.price, 0)
  const taxAmount = subtotal * (tax / 100)
  const tipAmount = subtotal * (tip / 100)
  const total = subtotal + taxAmount + tipAmount

  const totals = useMemo(() => people.map((person) => {
    const itemTotal = items.reduce((sum, item) => item.people.includes(person.id) ? sum + item.price / item.people.length : sum, 0)
    const share = subtotal ? itemTotal / subtotal : 0
    return { ...person, total: itemTotal + (taxAmount + tipAmount) * share }
  }), [people, items, subtotal, taxAmount, tipAmount])

  function addPerson(event: React.FormEvent) {
    event.preventDefault()
    const name = newPerson.trim()
    if (!name) return
    setPeople((current) => [...current, { id: Date.now(), name, color: ['#614184', '#394b82', '#63386d'][current.length % 3] }])
    setNewPerson('')
  }

  function addItem(event: React.FormEvent) {
    event.preventDefault()
    const price = Number(newPrice)
    if (!newItem.trim() || !price || people.length === 0) return
    setItems((current) => [...current, { id: Date.now(), name: newItem.trim(), price, people: people.map((person) => person.id) }])
    setNewItem('')
    setNewPrice('')
    setShowItemForm(false)
  }

  function togglePersonOnItem(itemId: number, personId: number) {
    setItems((current) => current.map((item) => item.id !== itemId ? item : {
      ...item,
      people: item.people.includes(personId)
        ? item.people.length === 1 ? item.people : item.people.filter((id) => id !== personId)
        : [...item.people, personId],
    }))
  }

  return (
    <main className="split-app">
      <header className="app-header">
        <a className="brand" href="#top" aria-label="Split App home"><span className="brand-mark">/</span><span>SPLIT<br />APP</span></a>
        <button className="icon-button" type="button" aria-label="Share this bill">↗</button>
      </header>

      <section className="intro" id="top">
        <p className="eyebrow">DINNER WITH FRIENDS · OCT 12</p>
        <h1>Make the split<br /><em>feel easy.</em></h1>
        <p className="intro-copy">Add the bill, choose who shared each item, and let everyone see their fair share.</p>
        <label className="receipt-cta"><span aria-hidden="true">▣</span> Take photo of receipt<input type="file" accept="image/*" capture="environment" /></label>
      </section>

      <section className="bill-section" aria-labelledby="bill-title">
        <div className="section-heading"><div><p className="eyebrow">01 / THE BILL</p><h2 id="bill-title">What did we share?</h2></div><span className="bill-total">{money(total)}</span></div>
        <div className="item-list">
          {items.map((item, index) => (
            <article className="item-row" key={item.id}>
              <div className="item-main"><div className="item-symbol" aria-hidden="true">{String(index + 1).padStart(2, '0')}</div><div><strong>{item.name}</strong><span>{item.people.length === people.length ? 'Everyone' : `${item.people.length} people`} · {money(item.price)}</span></div></div>
              <div className="item-people" aria-label={`Who shared ${item.name}`}>
                {people.map((person) => <button className={`person-chip ${item.people.includes(person.id) ? 'is-selected' : ''}`} style={{ '--person-color': person.color } as React.CSSProperties} key={person.id} type="button" aria-pressed={item.people.includes(person.id)} onClick={() => togglePersonOnItem(item.id, person.id)}>{person.name.charAt(0)}</button>)}
              </div>
            </article>
          ))}
        </div>
        {showItemForm ? <form className="add-item-form" onSubmit={addItem}><input value={newItem} onChange={(event) => setNewItem(event.target.value)} placeholder="Item name" aria-label="Item name" /><input value={newPrice} onChange={(event) => setNewPrice(event.target.value)} placeholder="0.00" type="number" min="0" step="0.01" aria-label="Item price" /><button className="primary-button" type="submit">Add item</button></form> : null}
        <button className="text-action" type="button" onClick={() => setShowItemForm((current) => !current)}>{showItemForm ? 'Close item form' : '+ Add an item'}</button>
      </section>

      <section className="people-section" aria-labelledby="people-title">
        <div className="section-heading"><div><p className="eyebrow">02 / THE CREW</p><h2 id="people-title">Who is in?</h2></div><span className="people-count">{people.length} people</span></div>
        <div className="people-list">{people.map((person) => <div className="person-row" key={person.id}><span className="large-avatar" style={{ background: person.color }}>{person.name.charAt(0)}</span><strong>{person.name}</strong><span className="person-total">{money(totals.find((totalPerson) => totalPerson.id === person.id)?.total ?? 0)}</span></div>)}</div>
        <form className="add-person-form" onSubmit={addPerson}><input value={newPerson} onChange={(event) => setNewPerson(event.target.value)} placeholder="Add a person" aria-label="New person's name" /><button className="round-add" type="submit" aria-label="Add person">+</button></form>
      </section>

      <section className="adjust-section" aria-labelledby="adjust-title">
        <div className="section-heading"><div><p className="eyebrow">03 / THE DETAILS</p><h2 id="adjust-title">Make it fair.</h2></div><span className="receipt-mark" aria-hidden="true">✳</span></div>
        <p className="tax-note">Local sales tax · San Francisco, CA · 8.5% dummy rate</p>
        <label className="range-row"><span>Tax <b>{tax}%</b></span><input type="range" min="0" max="20" step="0.5" value={tax} onChange={(event) => setTax(Number(event.target.value))} /></label>
        <label className="range-row"><span>Tip <b>{tip}%</b></span><input type="range" min="0" max="30" step="1" value={tip} onChange={(event) => setTip(Number(event.target.value))} /></label>
        <div className="summary-lines"><span>Subtotal <b>{money(subtotal)}</b></span><span>Tax + tip <b>{money(taxAmount + tipAmount)}</b></span><strong>Total <b>{money(total)}</b></strong></div>
      </section>

      <section className="share-section"><div><p className="eyebrow">READY TO SETTLE?</p><h2>Everyone knows<br /><em>what to send.</em></h2></div><button className="share-button" type="button">Share the split <span>↗</span></button></section>
      <footer><span>Split App · Make the math social.</span><span>Built for the table.</span></footer>
    </main>
  )
}

export default App
