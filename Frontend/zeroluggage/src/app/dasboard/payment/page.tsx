import { PaymentCheckout } from "@/components/payment/payment-checkout"

export default function Page({
  params,
}: {
  params: { bookingId: string }
}) {
  return <PaymentCheckout bookingId={params.bookingId} />
}