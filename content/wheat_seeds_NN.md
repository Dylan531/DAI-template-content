Title: Wheat Kernel Categorization Using a Neural Network
Date: 2022-05-01 19:11
Tags: neural network, machine learning
Category: Machine Learning
Slug: wheat-seeds-NN
Authors: Dylan

In Spring of 2022 I took a Neural Networks course that covered the field as a whole with the course textbook [Deep Learning](https://www.deeplearningbook.org/) written by Ian Goodfellow et al. Goodfellow himself is a huge inspiration to me with him bringing Generative Adversarial Networks to the stage of machine learning and sparking my interest in the field in the first place. 

While the book itself errs on the theoretical side of the field, it still has immense practical value. This project is the culmination of what we learned in the course, and it's a group effort between [Johannes Martinez](https://github.com/limosa-lapponica) and I. The code itself can be found on [GitHub](https://github.com/Dylan531/WheatSeedsML), and this article is a mirror of its contents and our discoveries.

The biggest boon to our improvement in accuracy was our initial creation of a method of recording our results, logging everything from our optimization function to our loss function and beyond. It especially helped in feature selection, but also justified changes like normalizing the data by observing the results when we did. Here is a snippet of what our data processing looked like, working with Keras in R: 

	:::R
    library(keras)
    library(tfdatasets)

    # Loading our data from CSV, duplicate for nomalized version
    seedsdf <- read.csv("seeds_dataset.csv")
    scaled_df <- read.csv("seeds_dataset.csv")

    # Various syntax for R dataframes
    summary(seedsdf)

    # Normalize data between 1 and 2
    for (i in 1:7) {
        # Get the min and the max of the specific column
        min <- min(seedsdf[, i])
        max <- max(seedsdf[, i])
        # Iterate through every element of that column to scale each value
        for (j in 1:length(seedsdf[, i])) {
            # Min-Max Normalization: (X – min(X)) / (max(X) – min(X))
            scaled_df[j, i] <- ((seedsdf[j, i] - min) / (max - min)) + 1
        }
    }

    # Set all of our constants for recording at the end
    loss_vect = c()
    accuracy_vect = c()
    sample_size <- 150
    layer_units <- 16
    model_loss <- "categorical_crossentropy"
    model_optimizer <- "adam"
    model_accuracy <- "accuracy"
    model_epochs <- 75
    model_loops <- 5
    select_df <- scaled_df[, c("Length", "Groove.Length", "Variety")]
    test_comment <- "One hidd layers with reg., learn rate 0.03, decay 0.0028"

    set.seed(1234) # Setting random seed for training/testing data split

    # Run the model for the amount of loops specified 
    # so we can get a better idea of its true performance
    for(i in 1:model_loops) {
    picked <- sample(seq_len(nrow(select_df)), size = sample_size)
    training <- select_df[picked, ]
    testing <- select_df[-picked, ]
    
    # Changing y into categorical data (performing one-hot encoding)
    training$Variety <- training$Variety - 1 # Standard is category count from 0
    testing$Variety <- testing$Variety - 1
    shape <- length(training) - 1
    y_tr <- to_categorical(training$Variety, num_classes = 3)
    y_test <- to_categorical(testing$Variety, num_classes = 3)
    
    ## Neural Network
    model <- keras_model_sequential() %>%
        layer_dense(units = layer_units, activation = "relu", input_shape = shape) %>%
        layer_dense(units = layer_units, activation = "relu", 
                    kernel_regularizer = regularizer_l1_l2(l1 = 0.0016, l2 = 0.0016)) %>%
        layer_dense(units = ncol(y_tr), activation = "softmax")
    
    model %>% compile(
        loss = model_loss,
        optimizer = optimizer_adam(learning_rate = 0.025, decay = 0.0028),
        metrics = model_accuracy
    )
    
    x_tr <- as.matrix(training[, 1:(length(training) -1)]) # need to convert to a matrix
    x_test <- as.matrix(testing[, 1:(length(testing) -1)])
    
    model %>%
        fit(
        x = x_tr, # input is the training subsets
        y = y_tr, # label is the last column
        epochs = model_epochs
        )
    
    # Test neural network
    score <- model %>% evaluate(x_test, y_test, verbose = 0)

    # Record its accuracy and loss before we loop so we can take the median later
    loss_vect[i] <- round(score[1], 4)
    accuracy_vect[i] <- round(score[2], 4)
    }

As the evaluation of the type of wheat seeds is categorical, it made the selection of our hyperparameters rather straightforward. The thing that took the most time for us to iron out the details on were the finer details like the amount of epochs, the amount of layers to use, and whether or not to use a regularizer or dropout layer. Overall, it was a very good learning experience, and below is a summary of the results in more detail:

<br/>
<br/>

## Introduction and Credits

In this project, we will attempt to classify three wheat varieties based on
geometric attributes of their kernels. The dataset we use for training and
testing was prepared by M. Charytanowicz et al. at the Institute of Mathematics
and Computer Science of the John Paul II Catholic University in Lublin, Poland.
It is available at the [UCI Machine Learning
Repository](https://archive.ics.uci.edu/ml/datasets/seeds).

## Dataset Description

Using a soft X-ray technique, Charytanowicz et al. collected the following
kernel features:

- Area *A*
- Perimeter *P*
- Compactness ![\frac{4\piA}{P^2}](https://latex.codecogs.com/svg.image?C=\frac{4\pi&space;A}{P^2})
- Length
- Width
- Asymmetry coefficient
- Length of kernel groove

The kernels belong to the Kama, Rosa, and Canadian varieties, labeled in the
dataset as categories 1, 2, and 3.

## Preliminary Processing

The numerical range of different features varies significantly. We noted, for
instance, that while the area varies between 10.59 and 21.18 units, the
compactness coefficient varies between just 0.8081 and 0.9183 units.


|     | Area  | Perimeter | Compactness | Length | Width | Asymmetry | Groove Length |
| --- | ----- | --------- | ----------- | ------ | ----- | --------- | ------------- |
| Min | 10.59 | 12.41     | 0.8081      | 4.899  | 2.630 | 0.7651    | 4.519         |
| Max | 21.18 | 17.25     | 0.9183      | 6.675  | 4.033 | 8.4560    | 6.550         |

In our first attempt with preprocessing, we scaled the range of each feature to
be between the numbers 1 and 2. This prevents features with larger ranges from
being represented disproportionally.

## Training and accuracy measures

We use a randomly selected 80/20 training/testing split. Thus 168 entries are
used for training. Given the relatively small size of the training set, we run
the training 5 times on different training/testing selections, and take the
median loss and accuracy scores across runs. We found this step necessary as
the loss and accuracy scores varied by more than 5% at times, making accessing
both the absolute and relative performance of different training parameters
difficult. We are using a feedforward neural network because that plays well with categorical classification data.
We used softmax as opposed to sigmoid in the last category because we have more categories than two (so it's not a binary classification).

## Feature Selection: First Round

### Correlations

We use the following Pearson correlation matrix to aid with feature selection.
Among highly correlated features, we are interested in selecting features whose
kernel density plots (seen below) most clearly suggest multiple distributions
exist (the hope being that each of these distributions is associated with a
category).

|               | Area   | Perimeter | Compact. | Length | Width  | Asymmetry | Groove L | Variety |
| ------------- | ------ | --------- | ----------- | ------ | ------ | --------- | ------------- | ------- |
| Area          | 1      | 0.994     | 0.608       | 0.95   | 0.971  | -0.23     | 0.864         | -0.346  |
| Perimeter     | 0.994  | 1         | 0.529       | 0.972  | 0.945  | -0.217    | 0.891         | -0.328  |
| Compact.   | 0.608  | 0.529     | 1           | 0.368  | 0.762  | -0.331    | 0.227         | -0.531  |
| Length        | 0.95   | 0.972     | 0.368       | 1      | 0.86   | -0.172    | 0.933         | -0.257  |
| Width         | 0.971  | 0.945     | 0.762       | 0.86   | 1      | -0.258    | 0.749         | -0.423  |
| Asymmetry     | -0.23  | -0.217    | -0.331      | -0.172 | -0.258 | 1         | -0.011        | 0.577   |
| Groove L | 0.864  | 0.891     | 0.227       | 0.933  | 0.749  | -0.011    | 1             | 0.024   |
| Variety       | -0.346 | -0.328    | -0.531      | -0.257 | -0.423 | 0.577     | 0.024         | 1       |

### Distributions

<p align="middle">
    <img src="https://raw.githubusercontent.com/Dylan531/WheatSeedsML/master/illustrations/area.png?raw=true)" width="350"/> 
    <img src="https://raw.githubusercontent.com/Dylan531/WheatSeedsML/master/illustrations/asymmetry.png?raw=true)" width="350"/>
    <img src="https://raw.githubusercontent.com/Dylan531/WheatSeedsML/master/illustrations/compactness.png?raw=true)" width="350"/> 
    <img src="https://raw.githubusercontent.com/Dylan531/WheatSeedsML/master/illustrations/groove_length.png?raw=true)" width="350"/>
    <img src="https://raw.githubusercontent.com/Dylan531/WheatSeedsML/master/illustrations/length.png?raw=true)" width="350"/> 
    <img src="https://raw.githubusercontent.com/Dylan531/WheatSeedsML/master/illustrations/perimeter.png?raw=true)" width="350"/>
    <img src="https://raw.githubusercontent.com/Dylan531/WheatSeedsML/master/illustrations/width.png?raw=true)" width="350"/> 
</p>

## Experiment Table Example

| Train Size | Nodes/ Layer| M Loss               | Opt. | M Accu. | Epoch | Input Shape | Feature Select.             | Test Loss | Test Accu. | Comment                  |
| ----------- | ----------- | ------------------------ | --------- | -------- | ------ | ----------- | ------------------------------ | --------- | ------------- | ------------------------- |
| 168         | 128         | cat. c. entrp            | adam      | accu. | 120    | 3           | Area, Asymm., Compact.      | 0.757   | 0.857        | None                |
| 168         | 128         | cat. c. entrp            | adam      | accu. | 75     | 7           | 1, 2, 3, 4, 5, 6, 7            | 0.992    | 0.881         | Regular. on layer 2 |
| 168         | 128         | cat. c. entrp            | adam      | accu. | 75     | 7           | 1, 2, 3, 4, 5, 6, 7            | 1.05    | 0.881         | Const. to 10    |
| 168         | 128         | cat. c. entrp            | adam      | accu. | 75     | 7           | 1, 2, 3, 4, 5, 6, 7            | 1.05    | 0.881         | Rand. data sel      |
| 160         | 128         | cat. c. entrp | adam      | accu. | 120    | 3           | Width, Compact., Groove L | 0.273    | 0.92          | One hidd. layer          |
| 160         | 128         | cat. c. entrp | adam      | accu. | 68     | 3           | Width, Compact., Groove L | 0.266    | 0.94          | Two hidd. layers         |
| 160 | 128 | cat. c. entrp | adam | accu. | 120 | 3   | Area, Compact., Groove L | 0.161 | 0.94 | Two hidd. layers |
| 160 | 128 | cat. c. entrp | adam | accu. | 120 | 3   | Area, Compact., Groove L | 0.143 | 0.94 | Three hidd. layers |
| 160 | 128 | cat. c. entrp | adam | accu. | 120 | 4   | Area, Compact., Groove L, Perim. | 0.153 | 0.96 | Sigmoid act. last hidd. layer |
| 150 | 64  | cat. c. entrp | adam | accu.| 500 | 3   | Length, Compact., Groove L | 0.176 | 0.967 | Five hidd. layers, reg. last hidd lay |

### Conclusions

Do not underestimate feature selection.
Evaluate single features, and combinations. Using two features that are not highly correlated may seem attractive, but if the one of the features is not very helpful in training for your objectives, combining it with the other might not help as much as you expect. Kernel length and the asymmetry coefficient, for example, were significantly less correlated than kernel length and groove length. Nevertheless, the kernel length and groove length pair proved to be more fruitful in training. 
If your model doesn’t converge in training, or does so sporadically, a slow learning rate and high number epochs, combined with a high capacity may help significantly. Once the model starts overfitting, introduce regularization. Once testing performance is satisfactory, experiment with lower capacities, epoch numbers, and learning and learning decay rates.