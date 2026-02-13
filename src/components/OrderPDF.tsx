import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

// Styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#FFFFFF",
    padding: 40,
    fontSize: 11,
    fontFamily: "Helvetica",
    color: "#374151",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#10B981",
    paddingBottom: 15,
    marginBottom: 25,
  },
  logo: {
    width: 140,
    height: 35,
  },
  orderInfo: {
    textAlign: "right",
  },
  orderId: {
    fontSize: 12,
    fontWeight: "bold",
  },
  orderDate: {
    fontSize: 10,
    color: "#6B7280",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#374151",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    paddingBottom: 4,
  },
  twoColumn: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  label: {
    fontWeight: "bold",
    color: "#6B7280",
    marginRight: 6,
  },
  value: {
    color: "#374151",
  },
  productTable: {
    marginTop: 5,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 4,
  },
  productHeader: {
    flexDirection: "row",
    backgroundColor: "#F3F4F6",
    padding: 6,
    borderBottomWidth: 1,
    borderColor: "#E5E7EB",
  },
  productHeaderText: {
    flex: 1,
    fontSize: 10,
    fontWeight: "bold",
    color: "#374151",
  },
  productRow: {
    flexDirection: "row",
    padding: 6,
    borderBottomWidth: 1,
    borderColor: "#E5E7EB",
  },
  productName: {
    flex: 2,
    fontSize: 10,
  },
  productQty: {
    flex: 1,
    fontSize: 10,
    textAlign: "center",
  },
  productPrice: {
    flex: 1,
    fontSize: 10,
    textAlign: "center",
  },
  productTotal: {
    flex: 1,
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "right",
  },
  totalSection: {
    marginTop: 20,
    padding: 12,
    backgroundColor: "#10B981",
    borderRadius: 6,
  },
  totalText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
  },
  footer: {
    marginTop: 40,
    textAlign: "center",
  },
  footerNote: {
    fontSize: 9,
    color: "#6B7280",
  },
  footerSmall: {
    fontSize: 7,
    color: "#9CA3AF",
    marginTop: 4,
  },
});

// Types
interface OrderPDFProps {
  order: {
    id: number;
    user_id: number;
    product_id: number[];
    quantity: number[];
    total_price: number;
    status: string;
    street_address: string;
    city: string;
    state: string;
    country: string;
    created_at: string;
    updated_at: string | null;
    customer_name?: string;
    customer_email?: string;
    products?: Array<{
      id: number;
      product_name: string;
      discounted_price: number;
    }>;
  };
}

const OrderPDF: React.FC<OrderPDFProps> = ({ order }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image src="/images/ecofriendly_dark.png" style={styles.logo} />
          </View>
          <View style={styles.orderInfo}>
            <Text style={styles.orderId}>Order #{order.id}</Text>
            <Text style={styles.orderDate}>{formatDate(order.created_at)}</Text>
          </View>
        </View>

        {/* Customer Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Customer Information</Text>
          <View style={styles.twoColumn}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{order.customer_name || "N/A"}</Text>
          </View>
          <View style={styles.twoColumn}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{order.customer_email || "N/A"}</Text>
          </View>
        </View>

        {/* Shipping Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shipping Address</Text>
          <View style={styles.twoColumn}>
            <Text style={styles.label}>Street:</Text>
            <Text style={styles.value}>{order.street_address || "N/A"}</Text>
          </View>
          <View style={styles.twoColumn}>
            <Text style={styles.label}>City:</Text>
            <Text style={styles.value}>{order.city || "N/A"}</Text>
          </View>
          <View style={styles.twoColumn}>
            <Text style={styles.label}>State:</Text>
            <Text style={styles.value}>{order.state || "N/A"}</Text>
          </View>
          <View style={styles.twoColumn}>
            <Text style={styles.label}>Country:</Text>
            <Text style={styles.value}>{order.country || "N/A"}</Text>
          </View>
        </View>

        {/* Order Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Items</Text>
          <View style={styles.productTable}>
            {/* Table Header */}
            <View style={styles.productHeader}>
              <Text style={[styles.productHeaderText, { flex: 2 }]}>
                Product
              </Text>
              <Text
                style={[
                  styles.productHeaderText,
                  { flex: 1, textAlign: "center" },
                ]}
              >
                Qty
              </Text>
              <Text
                style={[
                  styles.productHeaderText,
                  { flex: 1, textAlign: "center" },
                ]}
              >
                Price
              </Text>
              <Text
                style={[
                  styles.productHeaderText,
                  { flex: 1, textAlign: "right" },
                ]}
              >
                Total
              </Text>
            </View>

            {/* Product Rows */}
            {order.products?.length ? (
              order.products.map((product, index) => (
                <View key={index} style={styles.productRow}>
                  <Text style={styles.productName}>{product.product_name}</Text>
                  <Text style={styles.productQty}>{order.quantity[index]}</Text>
                  <Text style={styles.productPrice}>
                    ${product.discounted_price.toFixed(2)}
                  </Text>
                  <Text style={styles.productTotal}>
                    $
                    {(order.quantity[index] * product.discounted_price).toFixed(
                      2
                    )}
                  </Text>
                </View>
              ))
            ) : (
              <View style={styles.productRow}>
                <Text style={styles.productName}>
                  No product details available
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Total */}
        <View style={styles.totalSection}>
          <Text style={styles.totalText}>
            Total Amount: ${order.total_price.toFixed(2)}
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerNote}>
            Thank you for choosing EcoFriendly! 🌱
          </Text>
          <Text style={styles.footerSmall}>
            This is an automated invoice generated by EcoFriendly Admin System
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default OrderPDF;
