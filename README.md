xcrun instruments -s 列举可运行的ios模拟器
xcrun instruments -w 'iPhone 6 Plus (12.1)'
xcrun instruments -w 'iPhone 6s Plus'

react-native run-ios --simulator "iPhone XS"
react-native run-ios --simulator "iPhone 6s Plus"
react-native link react-native-image-crop-picker

lsof -n -i4TCP:8081
kill -9 