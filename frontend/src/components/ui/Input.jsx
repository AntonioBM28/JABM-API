/**
 * Input reutilizable con icono, validación visual y animaciones.
 *
 * @param {string}   id          - ID único del input
 * @param {string}   type        - Tipo de input (text, email, password)
 * @param {string}   label       - Label del campo
 * @param {string}   value       - Valor controlado
 * @param {function} onChange     - Callback de cambio
 * @param {string}   placeholder - Placeholder del input
 * @param {string}   icon        - SVG string del icono
 * @param {string}   error       - Mensaje de error
 * @param {boolean}  disabled    - Si está deshabilitado
 * @param {object}   extraProps  - Props adicionales para el input
 */
export default function Input({
  id,
  type = 'text',
  label,
  value,
  onChange,
  placeholder,
  icon,
  error,
  disabled = false,
  ...extraProps
}) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-light-300 ml-1"
        >
          {label}
        </label>
      )}

      <div className="relative group">
        {icon && (
          <span
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-light-400 
                       group-focus-within:text-primary-light transition-colors duration-300"
            aria-hidden="true"
            dangerouslySetInnerHTML={{ __html: icon }}
          />
        )}

        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            w-full rounded-xl border bg-dark-700/50 px-4 py-3
            text-light-100 placeholder-light-400/50
            transition-all duration-300 ease-out
            focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary
            hover:border-light-400/30
            disabled:opacity-50 disabled:cursor-not-allowed
            ${icon ? 'pl-11' : ''}
            ${error
              ? 'border-danger/50 focus:ring-danger/50 focus:border-danger'
              : 'border-light-400/10'
            }
          `}
          {...extraProps}
        />
      </div>

      {error && (
        <p className="text-danger text-xs ml-1 animate-slide-down" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
