interface PayPalButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export function PayPalButton({ className = '', children = 'Subscribe with PayPal' }: PayPalButtonProps) {
  return (
    <form
      action="https://www.paypal.com/cgi-bin/webscr"
      method="post"
      target="_top"
      className="inline-block"
    >
      <input type="hidden" name="cmd" value="_s-xclick" />
      <input type="hidden" name="hosted_button_id" value="SQV5ENU7FEN6C" />
      <input type="hidden" name="currency_code" value="USD" />
      <input type="hidden" name="return" value={typeof window !== 'undefined' ? `${window.location.origin}/payment-success?status=verified&email=` : ''} />
      <input type="hidden" name="rm" value="2" />
      <button
        type="submit"
        className={`bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all hover:shadow-lg hover:shadow-blue-600/25 ${className}`}
      >
        {children}
      </button>
    </form>
  );
}
