
[Main](README.md) > Dynamic Arrays

# Dynamic arrays

Sample 1

```c
struct items {
  int* data; /*array of ints*/
  int  size;
  int  capacity;
}
```
[source → ](array1.md)

Sample 2

```c
struct book {
    char title[10];
};

struct books {
    struct book* data; /*array of books*/
    int size;
    int capacity;
};

```
[source → ](array2.md)

Sample 3
```c
struct book {
    char* title;
};

void book_destroy(struct book* book) {
    free(book->title);
}
struct books {
    struct book* data; /*array of books*/
    int size;
    int capacity;
};
```
[source → ](array3.md)


Sample 4
```c
struct book {
    char* title;
};

void book_destroy(struct book* book) {
    free(book->title);
}
struct books {
    struct book** data; /*array of onwer pointers of books*/
    int size;
    int capacity;
};
```
[source → ](array4.md)

