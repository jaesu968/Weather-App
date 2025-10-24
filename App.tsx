import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView, Platform, AppState } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import NativeButton from "./components/NativeButton";

type Weather = {
  city: string;
  temperature: number;
  condition: string;
  humidity: number;
  unit: string;
};

type PlatformFeatures = {
  displayName: string;
  defaultUnit: string;
};

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<Weather | null>(null);
  const [favorites, setFavorites] = useState(["New York", "London", "Tokyo"]);
  const [appState, setAppState] = useState(AppState.currentState); // variable to track app state

  useEffect(() => {
    const subscription = AppState.addEventListener("change", setAppState);
    return () => subscription?.remove();
  }, []);

  const searchWeather = (targetCity?: string) => {
    const conditions = ["Sunny", "Cloudy", "Rainy", "Snowy"];
    const platformFeatures = getPlatformFeatures();

    const cityToUse = targetCity ?? (city || "Current Location");

    setWeather({
      city: cityToUse,
      temperature: Math.floor(Math.random() * 30) + 10,
      condition: conditions[Math.floor(Math.random() * conditions.length)],
      humidity: Math.floor(Math.random() * 40) + 30,
      unit: platformFeatures.defaultUnit === "Fahrenheit" ? "F" : "C",
    });
  };

  const addToFavorites = () => {
    if (city && !favorites.includes(city)) {
      setFavorites([...favorites, city]);
      setCity("");
    }
  };

  const getPlatformTitle = () => {
    const platformTitles = Platform.select({
        ios: "Weather App for iOS",
        android: "Weather App for Android",
        default: "Weather App"
    });
    return platformTitles || "Weather App";
  };

  const getPlatformPlaceholder = () => {
    const placeholders = Platform.select({
      ios: "ios platform",
      android: "android platform",
      default: "web platform",
    }); 
    return (placeholders || "web platform"); 

  };

  const getPlatformSectionTitle = () => {
    const sectionTitles = Platform.select({
      ios: "ios section title",
      android: "android section title",
      default: "section title",
    }); 
    return (sectionTitles || "section title"); 
  };

  const getPlatformFeatures = (): PlatformFeatures => {
    // features for each platform 
    const displayName = Platform.select({
        ios: "iOS Features",
        android: "Android Features",
        default: "Features"
    });
    // default unit for each platform
    const defaultUnit = Platform.select({
        ios: "Fahrenheit",
        android: "Celsius",
        default: "Celsius"
    
    }); 
    // return an object with both values above 
    return {
        displayName: displayName || "Features",
        defaultUnit: defaultUnit || "Celsius"
    };
  };

  const platformFeatures = getPlatformFeatures();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <ScrollView style={styles.scrollView}>
            <Text style={styles.title}>{getPlatformTitle()}</Text>

            <Text style={styles.platformInfo}>
                Platform: {Platform.OS} {Platform.Version} {appState}</Text>

            {/* Platform-specific features display */}
            <View style={styles.featuresSection}>
              <Text style={styles.featuresTitle}>
                {platformFeatures.displayName}
              </Text>
            </View>

            <View style={styles.searchSection}>
              <TextInput
                style={styles.input}
                placeholder={getPlatformPlaceholder()}
                value={city}
                onChangeText={setCity}
                returnKeyType={Platform.select({
                  ios: "search",
                  default: "done",
                })}
                onSubmitEditing={searchWeather}
              />
              <NativeButton
                title="Get Weather"
                onPress={() => searchWeather()}
              />
            </View>

            {weather ? (
              <View style={styles.weatherCard}>
                <Text style={styles.cityName}>{weather.city}</Text>
                <Text style={styles.temperature}>
                  {weather.temperature}
                  {weather.unit}
                </Text>
                <Text style={styles.condition}>{weather.condition}</Text>
                <Text style={styles.humidity}>
                  Humidity: {weather.humidity}%
                </Text>

                <NativeButton
                  title="Add to Favorites"
                  onPress={addToFavorites}
                  style={styles.favoriteButton}
                />
              </View>
            ) : null}

            <View style={styles.favoritesSection}>
              <Text style={styles.sectionTitle}>
                {getPlatformSectionTitle()}
              </Text>
              {favorites.map((favoriteCity, index) => (
                <NativeButton
                  key={index}
                  title={favoriteCity}
                  onPress={() => {
                    setCity(favoriteCity);
                    searchWeather(favoriteCity); // <--- Pass the city directly!
                  }}
                  style={styles.favoriteItem}
                />
              ))}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    ...Platform.select({
      ios: {
        backgroundColor: 'lightblue'
      }, 
      android: {
        backgroundColor: '#66c8eeff'
      }, 
      default: {
        backgroundColor: 'white'
      }
    }),
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  title: {
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
    color: "#333",
    ...Platform.select({
      ios: {
        fontSize: 17, 
        fontWeight: 'bold'
      }, 
      android: {
        fontSize: 20, 
        fontWeight: 'bold'
      },
      default: {
        fontSize: 22, 
        fontWeight: 'normal'
      }
    })
  },
  platformInfo: {
    fontSize: 14,
    textAlign: "center",
    color: "#666",
    marginBottom: 15,
    fontStyle: "italic",
  },
  featuresSection: {
    backgroundColor: "white",
    margin: 20,
    padding: 15,
    marginBottom: 10,
    borderLeftWidth: 4,
    ...Platform.select({
      ios: {
        fontSize: 15, 
        fontWeight: 'regular',
      }, 
      android: {
        fontSize: 16, 
        fontWeight: 'regular',
      }, 
      default: {
        fontSize: 17, 
        fontWeight: 'regular'
      }
    }),
  },
  featuresTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  featuresSubtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  featureItem: {
    fontSize: 13,
    color: "#555",
    marginBottom: 3,
  },
  searchSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  input: {
    backgroundColor: "white",
    ...Platform.select({
      ios: {
        borderRadius: 10, 
        padding: 8, 
        borderWidth: 1, 
      }, 
      android: {
        borderRadius: 4, 
        padding: 8, 
        borderWidth: 2
      },
      default: {
        borderRadius: 8, 
        padding: 8, 
        borderWidth: 1
      }
    }),
    fontSize: 16,
    marginBottom: 15,
    borderColor: "#ddd",
  },
  weatherCard: {
    backgroundColor: "white",
    margin: 20,
    padding: 20,
    ...Platform.select({
      ios: {
        boxShadow: "0 2px 4 px rgba(0, 0, 0, 0.18)",
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 3},
        shadowOpacity: 0.3,
        shadowRadius: 3
      },
      android: {
        elevation: 2, 
      }, 
      default: {
        elevation: 2
      }
    }),
    alignItems: "center",
  },
  cityName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  temperature: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#4A90E2",
    marginBottom: 5,
  },
  condition: {
    fontSize: 18,
    color: "#666",
    marginBottom: 10,
  },
  humidity: {
    fontSize: 16,
    color: "#888",
    marginBottom: 20,
  },
  favoriteButton: {
    backgroundColor: "#FF6B6B",
  },
  favoritesSection: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  favoriteItem: {
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: "#4A90E2",
  },
});
