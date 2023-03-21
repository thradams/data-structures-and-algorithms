
[Home](README.md)

# Dynamic arrays


```c
struct items {
  int* data;
  int  size;
  int  capacity;
}
```
[source → ](array1.md)


```c
struct book {
    char title[10];
};

struct books {
    struct book* data;
    int size;
    int capacity;
};

```
[source → ](array2.md)


```c
struct book {
    char* title;
};

void book_destroy(struct book* book) {
    free(book->title);
}
struct books {
    struct book* data;
    int size;
    int capacity;
};
```
[source → ](array3.md)



```c
struct book {
    char* title;
};

void book_destroy(struct book* book) {
    free(book->title);
}
struct books {
    struct book** data;
    int size;
    int capacity;
};
```
[source → ](array4.md)

