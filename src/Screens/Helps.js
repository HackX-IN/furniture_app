import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const HelpPage = ({navigation}) => {

  const [rating, setRating] = useState(null);
  const faqs = [
    {
        question: 'What is FurnishFlix?',
        answer: 'FurnishFlix is a user-friendly React Native app that offers a vast collection of furniture and home decor products. Browse through our extensive catalog and find the perfect items to enhance your living space.',
      },
      {
        question: 'How do I create an account?',
        answer: 'To create an account, simply tap on the "Sign Up" button on the app\'s home screen. Provide your email address and set a secure password. You can also sign up using your Google or Facebook account.',
      },
    {
      question: 'How can I search for products?',
      answer: 'To search for products, click on the search bar at the top of the screen and enter keywords related to the items you\'re looking for. You can also use filters to narrow down your search based on category, price range, and more.',
    },
    {
      question: 'How do I add items to my cart?',
      answer: 'To add items to your cart, browse the app\'s catalog, and when you find a product you like, tap on it to view the details. Click the "Add to Cart" button, and the item will be added to your shopping cart.',
    },
    {
      question: 'How do I place an order?',
      answer: 'To place an order, go to your shopping cart by tapping the cart icon in the top right corner of the screen. Review your items and quantities, then proceed to checkout. Follow the on-screen instructions to complete your order.',
    },
    {
      question: 'Can I track my order?',
      answer: 'Yes, you can track your order. Once your order is confirmed, you will receive an email with the tracking details. You can also check your order status in the "My Orders" section of your account.',
    },
    {
      question: 'What payment methods are accepted?',
      answer: 'We accept various payment methods, including credit/debit cards and digital wallets. All transactions are secure and encrypted to protect your information.',
    },
    {
      question: 'How can I contact customer support?',
      answer: 'If you have any questions, issues, or feedback, you can reach out to our customer support team through the "Contact Us" section in the app. We strive to respond to all inquiries promptly.',
    },
    {
      question: 'Is there a return policy?',
      answer: 'Yes, we have a hassle-free return policy. If you are not satisfied with your purchase, you can initiate a return request within 30 days of delivery. Please refer to the "Returns and Refunds" section for more details.',
    },
    {
      question: 'How can I leave a review?',
      answer: 'Your feedback is valuable to us. To leave a review, go to the product page of the item you purchased and scroll down to the review section. Tap on "Write a Review" and share your thoughts about the product.',
    },
    {
      question: 'Do you offer international shipping?',
      answer: 'Yes, we offer international shipping to many countries. During checkout, you can select your shipping destination, and the shipping cost will be calculated based on your location.',
    },
    {
      question: 'Is my personal information secure?',
      answer: 'Yes, we take your privacy and security seriously. Your personal information is encrypted and stored securely. We do not share your data with third parties without your consent. For more details, please review our Privacy Policy.',
    },
  ];
  

  const handleHelpfulButton = (isHelpful) => {
    if (rating === null) {
      setRating(isHelpful ? 'helpful' : 'unhelpful');
    }
  };

  return (
    <ScrollView style={styles.container}>
    <View style={{flexDirection:"row",gap:5,alignItems:"center"}}>
    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBackButton}>
        <Ionicons name="arrow-back" size={26} color="black"/>
      </TouchableOpacity>
      <Text style={styles.header}> Help Center</Text>
    </View>
      {faqs.map((faq, index) => (
        <View key={index} style={styles.faqContainer}>
          <Text style={styles.question}>{faq.question}</Text>
          <Text style={styles.answer}>{faq.answer}</Text>
        </View>
      ))}
      <Text style={styles.ratingHeader}>Was this helpful?</Text>
      <View style={styles.ratingContainer}>
       
        <TouchableOpacity
          style={[styles.helpfulButton, rating === 'helpful' ? styles.helpfulSelected : {}]}
          disabled={rating !== null}
          onPress={() => handleHelpfulButton(true)}
        >
          <Text style={styles.buttonText}>Helpful</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.helpfulButton, rating === 'unhelpful' ? styles.helpfulSelected : {}]}
          disabled={rating !== null}
          onPress={() => handleHelpfulButton(false)}
        >
          <Text style={styles.buttonText}>Not Helpful</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.contactContainer}>
        <Text style={styles.contactHeader}>Contact Information:</Text>
        <Text>Email: support@furnishflix.com</Text>
        <Text>Phone: +91 9000012345</Text>
        <Text>Live Chat: Available on the app during business hours.</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      marginBottom:50
    },
    header: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 15,
    },
    faqContainer: {
      marginBottom: 20,
      marginTop:9
    },
    question: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    answer: {
      fontSize: 16,
    },
    ratingContainer: {
      marginTop: 10,
      flexDirection: 'row',
      justifyContent: 'space-around',
      
    },
    ratingHeader: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    helpfulButton: {
      paddingVertical: 7,
      paddingHorizontal: 10,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#ccc',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    
    },

    helpfulSelected: {
      backgroundColor: 'green',
      borderColor: 'green',
    },
    buttonText: {
      color: 'black',
      fontWeight: 'bold',
    },
    contactContainer: {
      marginTop: 30,
    },
    contactHeader: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    goBackButton: {
        marginBottom: 10,
        alignSelf: 'flex-start',
        backgroundColor: '#f2f2f2',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
      },
      goBackText: {
        fontSize: 16,
        fontWeight: 'bold',
      },
  });
  
  export default HelpPage;