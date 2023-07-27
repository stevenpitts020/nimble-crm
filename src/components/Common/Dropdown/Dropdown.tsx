import React from 'react'

type SelectProps = React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>
interface IProps extends SelectProps {
  label?: string
  name: string
  placeholder?: string
  className?: string
  errors?: any
  autoFocus?: boolean
  options?: { name: string; id: string }[]
  disabled?: boolean
  defaultValue?: string
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

export const Dropdown = React.forwardRef<HTMLSelectElement, IProps>(
  (props, ref) => {
    return (
      <div
        className={`dropdown-select ${props.className}`}
        data-testid={props.name}
      >
        {props.label && <label>{props.label}</label>}
        <select
          id={props.name}
          className="ant-input ant-input-lg"
          name={props.name}
          data-testid={`select-branches`}
          ref={ref}
          placeholder={props.placeholder}
          autoFocus={props.autoFocus}
          disabled={props.disabled}
          onChange={props.onChange}
          defaultValue={props.defaultValue}
          value={props.value}
        >
          {props.options ? (
            props.options.map(data => {
              return (
                <option key={data.id} value={data.id}>
                  {data.name}
                </option>
              )
            })
          ) : (
            <option key={''} value={''}>
              ''
            </option>
          )}
        </select>
      </div>
    )
  }
)

Dropdown.defaultProps = {
  disabled: false,
  className: '',
}
