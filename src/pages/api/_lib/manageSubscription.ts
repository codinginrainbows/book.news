import { query as q } from 'faunadb';
import { faunadb } from '../../../services/fauna';
import { stripe } from '../../../services/stripe';

export async function saveSubscription(
  subscriptionId: string,
  customerId: string,
) {
  // search for user in FaunaDB through ID(customerId) aka stripe_customer_id by index user_by_stripe_customer_id
  const userRef = await faunadb.query(
    q.Select(
      "ref",
      q.Get(
        q.Match(
          q.Index('user_by_stripe_customer_id'),
          customerId
        )
      )
    )
  )

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  // saving only stuff we're gonna use
  const subscriptionData = {
    id: subscription.id,
    userId: userRef,
    status: subscription.status,
    priceId: subscription.items.data[0].price.id,
  }

  // save subscription data in FaunaDB
  await faunadb.query(
    q.Create(
      q.Collection('subscriptions'),
      { data: subscriptionData }
    )
  )

}